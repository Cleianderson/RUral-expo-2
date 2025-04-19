import { ViewProps } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type InfoProps = ViewProps & { label: string, info?: string | null }

export default function Info({ label, info }: InfoProps) {
  return (
    <ThemedView style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
      <ThemedText style={{ flex: 1 }}>{label}</ThemedText>
      <ThemedText>{info}</ThemedText>
    </ThemedView>
  )
}