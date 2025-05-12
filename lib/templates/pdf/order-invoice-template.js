import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12 },
});

const InvoiceTemplate = ({ invoice, order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Invoice</Text>
        <Text style={styles.text}>Invoice ID: {invoice.id}</Text>
        <Text style={styles.text}>Order ID: {order.order_Id}</Text>
        <Text style={styles.text}>Customer: {order.user?.name}</Text>
        <Text style={styles.text}>Email: {order.email}</Text>
        <Text style={styles.text}>Amount: ₦{invoice.amount}</Text>
        <Text style={styles.text}>
          Date: {new Date(invoice.issuedAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Items</Text>
        {order.orderItems.map((item, idx) => (
          <Text key={idx} style={styles.text}>
            {item.name} x {item.quantity} - ₦{item.price}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default InvoiceTemplate;
