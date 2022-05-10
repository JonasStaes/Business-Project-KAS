import { Document, Page, StyleSheet, View, Text } from "@react-pdf/renderer"
import { FC } from "react"
import { FeedbackDocument } from "../../redux/features/api/types"

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  

export const Feedback: FC<FeedbackDocument> = ({ approvalNote, calculatedRatios }) => (
    <Document>
        <Page size={"A4"} style={styles.page}>
            <View style={styles.section}>
                <Text>Section #1</Text>
            </View>
        </Page>
    </Document>
)