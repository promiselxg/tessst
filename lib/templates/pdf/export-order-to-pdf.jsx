// import React from "react";
// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: { padding: 30 },
//   header: { fontSize: 18, marginBottom: 10 },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//     gap: 10,
//   },
//   text: { fontSize: 10, maxWidth: 150, wordBreak: "break-word" },
// });

// const fieldMap = {
//   order_Id: { label: "Order ID", get: (o) => o.order_Id },
//   email: { label: "Email", get: (o) => o.email },
//   customer_name: {
//     label: "Customer Name",
//     get: (o) => o.user?.name || "Unknown",
//   },
//   amount: {
//     label: "Amount (₦)",
//     get: (o) => `₦${(o.amount / 100).toFixed(2)}`,
//   },
//   delivery_fee: {
//     label: "Delivery Fee (₦)",
//     get: (o) => `₦${(o.delivery_fee / 100).toFixed(2)}`,
//   },
//   paymentStatus: { label: "Payment Status", get: (o) => o.paymentStatus },
//   orderStatus: { label: "Order Status", get: (o) => o.orderStatus },
//   deliveryStatus: { label: "Delivery Status", get: (o) => o.deliveryStatus },
//   city: { label: "City", get: (o) => o.metadata?.city || "" },
//   state: { label: "State", get: (o) => o.metadata?.state || "" },
//   delivery_address: {
//     label: "Delivery Address",
//     get: (o) => o.metadata?.delivery_address || "",
//   },
//   cancelReason: {
//     label: "Cancel Reason",
//     get: (o) => o.metadata?.cancelReason || "",
//   },
//   createdAt: {
//     label: "Created At",
//     get: (o) => new Date(o.createdAt).toLocaleDateString("en-GB"), // DD/MM/YYYY
//   },
// };

// export default function ExportOrderTOPDF({ orders, selectedFields }) {
//   return (
//     <Document>
//       <Page style={styles.page}>
//         <Text style={styles.header}>Order Report</Text>

//         {/* Header Row */}
//         <View style={styles.row}>
//           {selectedFields.map((field) => (
//             <Text key={field} style={styles.text}>
//               {fieldMap[field]?.label || field}
//             </Text>
//           ))}
//         </View>

//         {/* Data Rows */}
//         {orders.map((order) => (
//           <View key={order.id} style={styles.row}>
//             {selectedFields.map((field) => (
//               <Text key={field} style={styles.text}>
//                 {fieldMap[field]?.get(order) ?? ""}
//               </Text>
//             ))}
//           </View>
//         ))}
//       </Page>
//     </Document>
//   );
// }

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10 },
  header: { fontSize: 16, marginBottom: 10, textAlign: "center" },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
});

// Render PDF document
export default function ExportOrderTOPDF({ orders, selectedFields = [] }) {
  const fieldMap = {
    order_Id: "Order ID",
    customer_name: "Customer Name",
    email: "Email",
    amount: "Amount (NGN)",
    delivery_fee: "Delivery Fee (NGN)",
    paymentStatus: "Payment Status",
    orderStatus: "Order Status",
    deliveryStatus: "Delivery Status",
    city: "City",
    state: "State",
    delivery_address: "Delivery Address",
    cancelReason: "Cancel Reason",
    createdAt: "Created At",
  };

  const getFieldValue = (field, order) => {
    switch (field) {
      case "customer_name":
        return order.user?.name || "Unknown";
      case "amount":
        return `${order.amount}`;
      case "delivery_fee":
        return `${order.delivery_fee}`;
      case "createdAt":
        return new Date(order.createdAt).toLocaleDateString("en-GB");
      case "city":
      case "state":
      case "delivery_address":
      case "cancelReason":
        return order.metadata?.[field] || "";
      default:
        return order[field] ?? "";
    }
  };

  const chunkOrders = (arr, size = 20) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const orderChunks = chunkOrders(orders);

  return (
    <Document>
      {orderChunks.map((chunk, pageIndex) => (
        <Page key={pageIndex} style={styles.page}>
          <Text style={styles.header}>Order Report - Page {pageIndex + 1}</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              {selectedFields.map((field) => (
                <Text key={field} style={styles.tableCol}>
                  {fieldMap[field]}
                </Text>
              ))}
            </View>
            {/* Table Rows */}
            {chunk.map((order, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                {selectedFields.map((field) => (
                  <Text key={field} style={styles.tableCol}>
                    {getFieldValue(field, order)}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
}
