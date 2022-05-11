import { Document, Page, StyleSheet, View, Text } from "@react-pdf/renderer"
import { FC } from "react"
import { FeedbackDocument } from "../../redux/features/api/types"

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#448AE6",
    color: "white",
    padding: 10,
    maxHeight: "5%",
  },
  title: {
    fontWeight: "semibold",
    fontSize: "22",
    lineHeight: "26"
  },
  page: {
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
  }
});
  

export const Feedback: FC<FeedbackDocument> = ({ approvalNote, calculatedRatios }) => (
    <Document>
        <Page size={"A4"} style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Omega</Text>
          </View>
          <View style={styles.section}>
          {calculatedRatios.map(ratio => (
            <Text>{ratio.name}: {ratio.ratio}</Text>
          ))}
            
            <Text>{approvalNote}</Text>
          </View>
        </Page>
    </Document>
)