import Button from '@/components/Button'
import RadioButton from '@/components/RadioButton'
import TextInput from '@/components/TextInput'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useToast } from '@/hooks/useToast'
import Api from '@/service/Api'
import { useTheme } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

export default function TabTwoScreen() {
  const { dark, colors } = useTheme()
  const toast = useToast()

  const [txtSuggestion, setTxtSuggestion] = useState('')
  const [txtIdentification, setTxtIdentification] = useState('')
  const [types, setTypes] = useState('others')
  const [error, setError] = useState<string | undefined>()

  const clearTextInputs = () => {
    setTxtIdentification('')
    setTxtSuggestion('')
    setError('')
  }

  const handleRadioSelect = (type: string) => {
    const MAP_TYPES: Record<string, string> = {
      Outros: 'others',
      Aplicativo: 'app',
      RU: 'ru',
    }

    setTypes(MAP_TYPES[type])
  }

  useEffect(() => setError(undefined), [txtSuggestion])

  const postSuggestion = async () => {
    if (txtSuggestion.trim().length < 10) {
      setError(
        'Caracteres insuficientes. A sua sugestão precisa ter, no mínimo, 10 caractéres'
      )
      return null
    }

    try {
      const resolve = await Api.post('/suggestion', {
        text: txtSuggestion,
        type: types,
        author: txtIdentification,
      })

      if (resolve.status >= 200 && resolve.status < 300) {
        toast({
          type: 'SUCCESS',
          message: 'Sua sugestão foi recebida, Obrigado <3',
          duration: 5000
        })

        clearTextInputs()
      } else {
        toast({
          type: 'FAIL',
          message: 'Houve um erro inesperado, tente novamente mais tarde',
          duration: 10000
        })
      }
    } catch {
      toast({
        type: 'FAIL',
        message: 'Houve um erro inesperado, tente novamente mais tarde',
        duration: 10000
      })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
      }}
    >
      <ThemedView
        style={{
          backgroundColor: colors.card,
          borderRadius: 10,
          padding: 30,
          elevation: 5,
        }}
      >
        <ThemedView
          style={{
            // minHeight: '45%',
            justifyContent: 'space-around',
            backgroundColor: 'transparent',
          }}
        >
          {error && (
            <ThemedText
              style={{
                paddingBottom: 20,
                textAlign: 'center',
                color: colors.notification,
              }}
            >
              {error}
            </ThemedText>
          )}
          <ThemedText style={{ fontSize: 16 }}>
            Escolha o tipo de sugestão
            <ThemedText style={{ color: colors.notification }}> *</ThemedText>
          </ThemedText>
          <RadioButton
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 20,
              marginBottom: 10,
            }}
            onSelect={handleRadioSelect}
            initialValue="Outros"
            options={['RU', 'Aplicativo', 'Outros']}
          />
          <TextInput
            label="Identificação"
            placeholder="Fulano Silva - Curso"
            onChangeText={setTxtIdentification}
            value={txtIdentification}
          />
          <TextInput
            label="Sugestão"
            needed
            placeholder="Mínimo de 10 caractéres"
            onChangeText={setTxtSuggestion}
            value={txtSuggestion}
            multiline
          />
          <ThemedText style={{ textAlign: 'center' }}>
            <ThemedText style={{ color: colors.notification }}>*</ThemedText> -
            Campo obrigatório
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ backgroundColor: 'transparent' }}>
          <Button onPress={postSuggestion} accessibilityLabel="Enviar sugestão">
            <ThemedText
              style={{
                marginTop: 10,
                marginBottom: 0,
                backgroundColor: colors.primary,
                fontWeight: '800',
                textAlign: 'center',
                padding: 7,
                color: dark ? '#2b2b2b6' : '#f0f0f0',
                borderRadius: 7,
              }}
            >
              ENVIAR
            </ThemedText>
          </Button>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  )
}
