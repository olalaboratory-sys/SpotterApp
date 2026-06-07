import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Pressable, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { usePlaces, PlaceType } from '../context/PlacesContext';

const TYPES: { id: PlaceType; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'gym', label: 'Gym', icon: 'barbell-outline' },
  { id: 'home', label: 'Home', icon: 'home-outline' },
  { id: 'hotel', label: 'Hotel', icon: 'bed-outline' },
  { id: 'other', label: 'Other', icon: 'ellipsis-horizontal' },
];

export default function PlacePickerSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { places, currentId, setCurrent, addPlace, renamePlace, deletePlace, machineCount } = usePlaces();
  const [creating, setCreating] = useState(false);
  const [manage, setManage] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<PlaceType>('gym');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const reset = () => { setCreating(false); setManage(false); setName(''); setType('gym'); setEditingId(null); setEditName(''); };

  const startEdit = (id: string, current: string) => { setEditingId(id); setEditName(current); };
  const saveEdit = async () => {
    const id = editingId;
    if (id && editName.trim()) await renamePlace(id, editName.trim());
    setEditingId(null); setEditName('');
  };
  const close = () => { reset(); onClose(); };

  const create = async () => {
    if (!name.trim()) return;
    await addPlace(name.trim(), type);
    reset();
    onClose();
  };

  const confirmDelete = (id: string, label: string) => {
    if (places.length <= 1) { Alert.alert('Keep at least one place', 'You need at least one place.'); return; }
    Alert.alert('Delete place', `Remove “${label}” and its saved machines?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deletePlace(id) },
    ]);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={close}>
      <Pressable style={styles.backdrop} onPress={close} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.headerRow}>
          <Text style={styles.title}>{creating ? 'New place' : manage ? 'Manage places' : 'My places'}</Text>
          {!creating && (
            <TouchableOpacity onPress={() => { setManage(m => !m); setEditingId(null); }}>
              <Text style={styles.manageLink}>{manage ? 'Done' : 'Manage'}</Text>
            </TouchableOpacity>
          )}
        </View>

        {creating ? (
          <View style={{ gap: 14 }}>
            <TextInput
              style={styles.input}
              placeholder="Place name (e.g. Anytime Fitness)"
              placeholderTextColor={Colors.labelTertiary}
              value={name}
              onChangeText={setName}
              autoFocus
            />
            <View style={styles.typeRow}>
              {TYPES.map(t => (
                <TouchableOpacity key={t.id} style={[styles.typeBtn, type === t.id && styles.typeBtnActive]} onPress={() => setType(t.id)}>
                  <Ionicons name={t.icon} size={18} color={type === t.id ? Colors.greenDeep : Colors.labelSecondary} />
                  <Text style={[styles.typeLabel, type === t.id && styles.typeLabelActive]}>{t.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.primaryBtn} onPress={create}>
              <Text style={styles.primaryBtnText}>Create place</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCreating(false)} style={{ alignItems: 'center', paddingVertical: 6 }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {places.map(p => (
              <TouchableOpacity
                key={p.id}
                style={styles.placeRow}
                activeOpacity={0.8}
                onPress={() => { if (manage) return; setCurrent(p.id); close(); }}
              >
                <View style={styles.placeIcon}><Ionicons name={(TYPES.find(t => t.id === p.type)?.icon) ?? 'barbell-outline'} size={20} color={Colors.greenDeep} /></View>
                {editingId === p.id ? (
                  <>
                    <TextInput
                      style={styles.editInput}
                      value={editName}
                      onChangeText={setEditName}
                      autoFocus
                      onSubmitEditing={saveEdit}
                      placeholder="Place name"
                      placeholderTextColor={Colors.labelTertiary}
                    />
                    <TouchableOpacity onPress={saveEdit} hitSlop={8}>
                      <Ionicons name="checkmark-circle" size={24} color={Colors.green} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.placeName}>{p.name}</Text>
                      <Text style={styles.placeSub}>{machineCount(p.id)} machines</Text>
                    </View>
                    {manage ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <TouchableOpacity onPress={() => startEdit(p.id, p.name)} hitSlop={8}>
                          <Ionicons name="pencil-outline" size={19} color={Colors.greenDeep} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => confirmDelete(p.id, p.name)} hitSlop={8}>
                          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                        </TouchableOpacity>
                      </View>
                    ) : p.id === currentId ? (
                      <Ionicons name="checkmark-circle" size={22} color={Colors.green} />
                    ) : (
                      <View style={styles.radio} />
                    )}
                  </>
                )}
              </TouchableOpacity>
            ))}
            {!manage && (
              <TouchableOpacity style={styles.newRow} onPress={() => setCreating(true)}>
                <View style={styles.newIcon}><Ionicons name="add" size={20} color={Colors.greenDeep} /></View>
                <Text style={styles.newText}>New place</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(6,12,9,0.4)' },
  sheet: { backgroundColor: Colors.cloud, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 20, paddingBottom: 40, gap: 8 },
  handle: { width: 38, height: 5, borderRadius: 3, backgroundColor: '#d9d9de', alignSelf: 'center', marginBottom: 10 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '700', letterSpacing: -0.3, color: Colors.labelPrimary },
  manageLink: { fontSize: 15, fontWeight: '600', color: Colors.greenDeep },
  placeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 4 },
  placeIcon: { width: 40, height: 40, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  placeName: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary },
  placeSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 1 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: Colors.separator },
  newRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, marginTop: 4 },
  newIcon: { width: 40, height: 40, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: Colors.green, borderStyle: 'dashed' },
  newText: { fontSize: 16, fontWeight: '600', color: Colors.greenDeep },
  input: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1.5, borderColor: Colors.separator, padding: 14, fontSize: 16, color: Colors.labelPrimary },
  editInput: { flex: 1, fontSize: 16, fontWeight: '600', color: Colors.labelPrimary, borderBottomWidth: 1.5, borderBottomColor: Colors.green, paddingVertical: 2 },
  typeRow: { flexDirection: 'row', gap: 8 },
  typeBtn: { flex: 1, alignItems: 'center', gap: 5, paddingVertical: 12, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1.5, borderColor: Colors.separator },
  typeBtnActive: { borderColor: Colors.green, backgroundColor: Colors.mist2 },
  typeLabel: { fontSize: 12, fontWeight: '600', color: Colors.labelSecondary },
  typeLabelActive: { color: Colors.greenDeep },
  primaryBtn: { height: 52, borderRadius: 14, backgroundColor: Colors.green, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  cancelText: { fontSize: 15, color: Colors.labelSecondary },
});
