import CheckBox from 'expo-checkbox';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import RadioButton from '@/components/RadioButton';

export default function TabTwoScreen() {
  const { colors } = useTheme()

  const [txtSuggestion, setTxtSuggestion] = useState('')
  const [txtIdentification, setTxtIdentification] = useState('')
  const [types, setTypes] = useState([false, false, false])

  const postSuggestion = () => { }

  const handleCheckBox = (_type: 'RU' | 'APP' | 'OTHERS') => {
    if (_type === 'RU') setTypes([])
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: colors.card, justifyContent: 'center' }}>
      <ThemedView style={{ backgroundColor: colors.background, borderRadius: 10, padding: 30, elevation: 5 }}>
        <ThemedView style={{ minHeight: '45%', justifyContent: 'space-around' }}>
          <ThemedText style={{ fontSize: 16 }}>
            Escolha o tipo de sugestão <ThemedText style={{ color: colors.notification }}>*</ThemedText>
          </ThemedText>
          <RadioButton style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20, marginBottom: 10 }} onSelect={() => { }} options={['RU', 'Aplicativo', 'Outros']} />
          <TextInput
            label='Identificação'
            placeholder="Fulano Silva - Curso"
            onChangeText={setTxtIdentification}
            value={txtIdentification}
          />
          <TextInput
            label='Sugestão'
            needed
            placeholder="Mínimo de 10 caractéres"
            onChangeText={setTxtSuggestion}
            value={txtSuggestion}
            multiline
          />
          <ThemedText style={{ textAlign: 'center' }}>
            <ThemedText style={{ color: colors.notification }}>*</ThemedText> - Campo obrigatório{' '}
          </ThemedText>
        </ThemedView>
        <ThemedView>
          <Button onPress={postSuggestion} accessibilityLabel="Enviar sugestão">
            <ThemedText
              style={{
                marginTop: 10,
                marginBottom: 0,
                backgroundColor: colors.primary,
                fontWeight: '800',
                textAlign: 'center',
                padding: 7,
                color: colors.text_contrast,
                borderRadius: 7
              }}
            >
              ENVIAR
            </ThemedText>
          </Button>
        </ThemedView>
      </ThemedView>
    </ScrollView >
  );
}
