import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export function Home() {
    const [participantName, setParticipantName] = useState('');
    const [participants, setParticipants] = useState<string[]>([]);

    function handleParticipantAdd() {
        if(participants.includes(participantName)) {
           return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome.")
        }

        setParticipants(prevState => [...prevState, participantName]);
        setParticipantName('');
    }

    function handleParticipantRemove(name: string) {
        Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
            {
                text: "Sim",
                onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
            },
            {
                text: "Não",
                style: "cancel"
            }
            
        ])
    }

  return (
    <View style={styles.container}>       
        <Text style={styles.eventName}>
          Nome do evento
        </Text>
        <Text style={styles.eventDate}>
          {
            new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
          }
        </Text>

        <View style={styles.form}>
            <TextInput 
                style={styles.input}
                placeholder="Nome do participante"
                placeholderTextColor={'#6B6B6B'}
                value={participantName}
                onChangeText={setParticipantName}
            />

            <TouchableOpacity 
                style={participantName === '' ? styles.buttonDisabled :styles.button}
                onPress={() => handleParticipantAdd()}
                disabled={participantName === ''}
            >
                <Text style={styles.buttonText}>
                    +
                </Text>
            </TouchableOpacity>

        </View>

        {/* <ScrollView showsVerticalScrollIndicator={false}>
            {
                participants.map(participant => (
                    <Participant 
                        key={participant}
                        name={participant}
                        onRemove={handleParticipantRemove}
                    />
                ))
            }
        </ScrollView> */}

        <FlatList
            data={participants}
            keyExtractor={item => item}
            renderItem={({ item }) => (
                <Participant 
                    key={item}
                    name={item}
                    onRemove={() => handleParticipantRemove(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <Text style={styles.listEmptyText}>
                    Ninguém chegou ainda! Adicione participantes a sua lista de presença.
                </Text>
            )}
        />

    </View>
  )
}