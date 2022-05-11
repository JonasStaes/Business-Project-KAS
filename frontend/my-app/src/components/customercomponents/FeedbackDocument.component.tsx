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
  },
  divider: {
    borderBottom: "30",
    borderBottomColor: "#448AE6"
  },
});
  

export const Feedback: FC<FeedbackDocument> = ({ approvalNote, calculatedRatios }) => (
    <Document>
        <Page size={"A4"} style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Omega</Text>
          </View>
          <View style={styles.section}>
            <Text>Details aanvraag</Text>
          </View>
          <View style={styles.divider}/>
          <View style={styles.section}>
            <Text>Prijszetting &amp; aflossing</Text>
          </View>
          <View style={styles.divider}/>
          <View style={styles.section}>
            <Text>
              Opmerking: {"\n"}
              {approvalNote}
            </Text>
            <Text>{"\n"}</Text>
            {calculatedRatios.map(ratio => (
              <Text key={ratio.name} style={{ backgroundColor: ratio.ratioValid ? "#5AC129" : "#C33212", padding: 4, margin: 1 }}>
                {ratio.name}: {ratio.ratio}
              </Text>
            ))}
          </View>
        </Page>
    </Document>
)