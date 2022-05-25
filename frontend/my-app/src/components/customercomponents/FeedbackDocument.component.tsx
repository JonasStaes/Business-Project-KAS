import { ExclamationIcon } from "@heroicons/react/solid";
import { Document, Page, StyleSheet, View, Text } from "@react-pdf/renderer"
import { FC, useEffect } from "react"
import { CreditRequestReadDto, FeedbackDocument } from "../../redux/features/api/types"
import { cleanUpStringUppercase, formatNumber } from "../../services/frontend/TextParser.service";

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
  table: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    borderColor: "black",
    borderWidth: 2,
    padding: 10
  }
});

interface FeedbackProps {
  feedbackDocument: FeedbackDocument,
  creditRequest: CreditRequestReadDto
}
  

const calculateRequestedAmount = (totalAmount: number, financedAmount: number) => {
  return parseFloat((((parseFloat(totalAmount.toFixed(2)) * 10) - (parseFloat(financedAmount.toFixed(2))) * 10) / 10).toFixed(2))
}


export const Feedback: FC<FeedbackProps> = ({ feedbackDocument: { approvalNote, calculatedRatios, amortizationSchedule }, creditRequest: { name, investmentType, totalAmount, financedAmount } }) => { 
  
  useEffect(() => {
    console.log(amortizationSchedule)
  })
  
  return (
    <Document>
        <Page size={"A4"} style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Omega  </Text>
          </View>
          <View style={styles.section}>
            <Text>
            <ExclamationIcon className="fill-yellow-500 h-7 w-7 mr-2"/>
              Naam project: {name}
              {"\n"}
              Investeringstype: {cleanUpStringUppercase(investmentType)} 
              {"\n"}
              Totaal Bedrag: &euro; {formatNumber(totalAmount)}  
              {"\n"}
              Zelfgefinancieerd bedrag: &euro; {formatNumber(financedAmount)}
              {"\n"}
              Gevraagd bedrag: &euro; {formatNumber(calculateRequestedAmount(totalAmount, financedAmount))}
            </Text>
          </View>
          {amortizationSchedule !== null && 
            <View>
              <View style={styles.divider}/>
              <View style={styles.section}>
                <Text>Prijszetting &amp; aflossing</Text>
                <Text>{"\n"}</Text>
                <View style={styles.table}>
                  <View>
                    <Text>Datum {"\n"}</Text>
                    <View style={styles.column}>
                      {amortizationSchedule.remainingDebt.map((entry, i) => (
                        <Text key={i}>{`Jaar ${i}`} {"\n"}</Text>
                      ))}
                    </View>
                  </View>
                  <View>
                    <Text>Uitstaande schuld {"\n"}</Text>
                    <View style={styles.column}>
                      {amortizationSchedule.remainingDebt.map((entry, i) => (
                        <Text key={i}>{formatNumber(entry)} {"\n"}</Text>
                    ))}
                    </View>
                  </View>
                  <View>
                    <Text>Rente {"\n"}</Text>
                    <View style={styles.column}>
                      {amortizationSchedule.yearlyInterest.map((entry, i) => (
                        <Text key={i}>{formatNumber(entry)} {"\n"}</Text>
                      ))}
                    </View>
                  </View>
                  <View>
                    <Text>Aflossing {"\n"}</Text>
                    <View style={styles.column}>
                      {amortizationSchedule.yearlyDebtPayment.map((entry, i) => (
                        <Text key={i}>{formatNumber(entry)} {"\n"}</Text>
                    ))}
                    </View>
                  </View>
                  <View>
                    <Text>Betaling {"\n"}</Text>
                    <View style={styles.column}>
                      {amortizationSchedule.yearlyTotalPayment.map((entry, i) => (
                        <Text key={i}>{formatNumber(entry)} {"\n"}</Text>
                    ))}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          }
        </Page>
        <Page>
          <View style={styles.divider}/>
          <View style={styles.section}>
            <Text>
              Opmerking: {"\n"}
              {approvalNote}
            </Text>
            <Text>{"\n"}</Text>
            {calculatedRatios.map(ratio => (
              <Text key={ratio.name}>
                {ratio.name}: {ratio.ratio}
              </Text>
            ))}
          </View>
        </Page>
    </Document>
  )
}