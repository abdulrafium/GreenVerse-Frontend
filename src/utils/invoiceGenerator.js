import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoicePDF = (order) => {
  const doc = new jsPDF();
  
  // Company Header
  doc.setFillColor(15, 81, 50); // #0F5132
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont(undefined, 'bold');
  doc.text('GreenVerse', 20, 25);
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('Sustainable Banana Fiber Products', 20, 32);
  
  // Invoice Title
  doc.setTextColor(15, 81, 50);
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text('INVOICE', 150, 25);
  
  // Invoice Details Box
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  const invoiceDate = new Date(order.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  doc.text(`Invoice #: ${order.id.substring(0, 8).toUpperCase()}`, 150, 32);
  doc.text(`Date: ${invoiceDate}`, 150, 37);
  
  // Customer Information
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(58, 161, 116); // #3AA174
  doc.text('Bill To:', 20, 55);
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(order.user?.name || 'Customer', 20, 62);
  doc.text(order.user?.email || 'N/A', 20, 68);
  
  // Add phone and address robustly (check all possible field names)
  let customerInfoY = 74;
  // Phone
  const phone =
    order.profile?.phone ||
    order.profile?.phone_number ||
    order.user?.phone ||
    order.user?.phone_number ||
    order.user?.mobile ||
    order.profile?.mobile ||
    '';
  doc.text(`Phone: ${phone || 'N/A'}`, 20, customerInfoY);
  customerInfoY += 6;

  // Address
  const address =
    order.profile?.address_line ||
    order.profile?.address ||
    order.user?.address_line ||
    order.user?.address ||
    order.profile?.street ||
    order.user?.street ||
    '';
  doc.text(`Address: ${address || 'N/A'}`, 20, customerInfoY);
  customerInfoY += 6;

  // Location (city/district/state)
  const location = [
    order.profile?.city || order.user?.city || '',
    order.profile?.district || order.user?.district || '',
    order.profile?.state || order.user?.state || ''
  ].filter(Boolean).join(', ');
  if (location) {
    doc.text(location, 20, customerInfoY);
    customerInfoY += 6;
  }
  
  // Order Status
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  const statusColor = order.status === 'Delivered' ? [34, 197, 94] : 
                      order.status === 'Shipped' ? [168, 85, 247] :
                      order.status === 'Processing' ? [59, 130, 246] : [234, 179, 8];
  doc.setTextColor(...statusColor);
  doc.text(`Status: ${order.status}`, 150, 55);
  
  // Delivery Date
  if (order.delivery_date) {
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    const deliveryDate = new Date(order.delivery_date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.text(`Delivery Date: ${deliveryDate}`, 150, 62);
  }
  
  // Order Items Table - Support multiple products
  const tableStartY = Math.max(customerInfoY + 10, 95);
  
  // Prepare table data
  let tableData = [];
  if (order.items && order.items.length > 0) {
    // Multi-product order
    tableData = order.items.map(item => [
      item.product?.name || 'N/A',
      item.quantity,
      `PKR ${parseFloat(item.unit_price || 0).toFixed(2)}`,
      `PKR ${parseFloat(item.total_price || 0).toFixed(2)}`
    ]);
  } else {
    // Single product order (backward compatibility)
    tableData = [[
      order.product?.name || 'N/A',
      order.quantity,
      `PKR ${(order.amount / order.quantity).toFixed(2)}`,
      `PKR ${parseFloat(order.amount).toFixed(2)}`
    ]];
  }
  
  autoTable(doc, {
    startY: tableStartY,
    head: [['Product', 'Quantity', 'Unit Price', 'Amount']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [58, 161, 116], // #3AA174
      textColor: 255,
      fontSize: 11,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 10
    },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 40, halign: 'right' },
      3: { cellWidth: 40, halign: 'right' }
    }
  });
  
  // Summary Section
  const finalY = doc.lastAutoTable.finalY + 10;
  
  doc.setDrawColor(200, 200, 200);
  doc.line(130, finalY, 190, finalY);
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('Subtotal:', 130, finalY + 8);
  doc.text(`PKR ${parseFloat(order.amount).toFixed(2)}`, 190, finalY + 8, { align: 'right' });
  
  doc.setFont(undefined, 'normal');
  doc.text('Tax (0%):', 130, finalY + 15);
  doc.text('PKR 0.00', 190, finalY + 15, { align: 'right' });
  
  doc.setDrawColor(58, 161, 116);
  doc.setLineWidth(0.5);
  doc.line(130, finalY + 18, 190, finalY + 18);
  
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(15, 81, 50);
  doc.text('Total:', 130, finalY + 26);
  doc.text(`PKR ${parseFloat(order.amount).toFixed(2)}`, 190, finalY + 26, { align: 'right' });
  
  // Environmental Impact Section
  const impactY = finalY + 40;
  doc.setFillColor(246, 243, 235); // #F6F3EB
  doc.rect(20, impactY, 170, 35, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(58, 161, 116);
  doc.setFont(undefined, 'bold');
  doc.text('🌱 Your Environmental Impact', 25, impactY + 8);
  
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'normal');
  
  // Calculate total quantity for impact metrics
  let totalQuantity = order.quantity;
  if (order.items && order.items.length > 0) {
    totalQuantity = order.items.reduce((sum, item) => sum + parseInt(item.quantity), 0);
  }
  
  const plasticSaved = (totalQuantity * 2).toFixed(0);
  const co2Reduced = (totalQuantity * 0.007).toFixed(2);
  const waterSaved = (totalQuantity * 30).toFixed(0);
  
  doc.text(`Plastic Saved: ${plasticSaved} kg`, 25, impactY + 16);
  doc.text(`CO2 Reduced: ${co2Reduced} tons`, 80, impactY + 16);
  doc.text(`Water Saved: ${waterSaved} L`, 135, impactY + 16);
  
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('By choosing GreenVerse, you\'re contributing to a sustainable future!', 25, impactY + 26);
  
  // Footer
  const footerY = 270;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, footerY, 190, footerY);
  
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for your business!', 105, footerY + 5, { align: 'center' });
  doc.text('GreenVerse - From Waste To Worth', 105, footerY + 10, { align: 'center' });
  doc.text('Contact: info@greenverse.com | www.greenverse.com', 105, footerY + 15, { align: 'center' });
  
  // Generate Order ID for filename
  const orderIdShort = order.id.substring(0, 8).toUpperCase();
  const fileName = `GreenVerse_Invoice_${orderIdShort}.pdf`;
  
  // Save PDF
  doc.save(fileName);
};
