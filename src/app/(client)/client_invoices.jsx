import React from "react";
import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { ordersAPI } from "../../services/api"
import { Download, Loader2, FileText } from "lucide-react"
import { generateInvoicePDF } from "../../utils/invoiceGenerator"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./dashboard.css"

export default function ClientInvoices() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Invoices - GreenVerse'
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await ordersAPI.getAll()
      // Only show delivered orders for invoices
      const deliveredOrders = response.data.orders?.filter(o => o.status === 'Delivered') || []
      setOrders(deliveredOrders)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to load invoices')
    } finally {
      setLoading(false)
    }
  }

  const formatOrderId = (order, index) => {
    const userName = order.user?.name || 'User'
    const nameParts = userName.split(' ')
    const initials = nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : userName.substring(0, 2).toUpperCase()
    
    const orderNum = String(index + 1).padStart(2, '0')
    return `GV-${initials}-${orderNum}`
  }

  const handleDownloadInvoice = (order) => {
    try {
      generateInvoicePDF(order)
      toast.success('Invoice downloaded successfully!')
    } catch (error) {
      console.error('Error generating invoice:', error)
      toast.error('Failed to generate invoice')
    }
  }

  const handleDownloadAll = () => {
    if (orders.length === 0) {
      toast.warning('No invoices to download')
      return
    }
    
    orders.forEach((order, index) => {
      setTimeout(() => {
        generateInvoicePDF(order)
      }, index * 300) // Delay each download by 300ms
    })
    
    toast.success(`Downloading ${orders.length} invoices...`)
  }

  // Expanded state for multi-product rows
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (orderId) => {
    setExpandedRows(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <Sidebar role="client" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7' }}>
        <div className="dashboard-header">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Invoices</h1>
          <Button variant="primary" onClick={handleDownloadAll} disabled={orders.length === 0}>
            <Download size={18} /> Download All
          </Button>
        </div>

        <Card>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-[#3AA174]" />
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center">
              <FileText size={48} className="mx-auto mb-4 text-stone-300" />
              <p className="text-stone-500 text-lg mb-2">No invoices available</p>
              <p className="text-stone-400 text-sm">Invoices will appear here after your orders are delivered</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-stone-200">
                    <th className="text-left py-3 px-4 text-stone-600 font-semibold">Invoice #</th>
                    <th className="text-left py-3 px-4 text-stone-600 font-semibold">Product</th>
                    <th className="text-left py-3 px-4 text-stone-600 font-semibold">Quantity</th>
                    <th className="text-left py-3 px-4 text-stone-600 font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 text-stone-600 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-stone-600 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const isMultiProduct = order.items && order.items.length > 1;
                    const productCount = isMultiProduct ? order.items.length : 1;
                    const productNames = isMultiProduct
                      ? order.items.map(item => item.product?.name || 'N/A')
                      : [order.product?.name || 'N/A'];

                    return (
                      <React.Fragment key={order.id}>
                        <tr className="border-b border-stone-100 hover:bg-[#F6F3EB]/50 transition-colors">
                          <td className="py-3 px-4 font-mono text-sm font-semibold text-[#3AA174]">
                            {formatOrderId(order, index)}
                          </td>
                          <td className="py-3 px-4 text-[#0F5132] font-medium">
                            {isMultiProduct ? (
                              <span
                                className="flex items-center gap-2 cursor-pointer select-none"
                                onClick={() => toggleRow(order.id)}
                              >
                                {productCount} products
                                <span className={`transition-transform duration-300 ${expandedRows[order.id] ? 'rotate-90' : ''}`}>
                                  ▶
                                </span>
                              </span>
                            ) : (
                              productNames[0]
                            )}
                          </td>
                          <td className="py-3 px-4 text-stone-600">
                            {order.quantity} units
                          </td>
                          <td className="py-3 px-4 text-stone-700 font-semibold">
                            PKR {parseFloat(order.amount || 0).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-stone-600">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleDownloadInvoice(order)}
                              className="px-4 py-1.5 bg-[#3AA174] text-white rounded-full font-semibold text-xs hover:bg-[#0F5132] transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex items-center gap-1"
                            >
                              <Download size={14} /> Download
                            </button>
                          </td>
                        </tr>
                        {isMultiProduct && expandedRows[order.id] && (
                          <tr className="bg-[#F6F3EB]/40">
                            <td></td>
                            <td colSpan={5} className="py-2 px-4">
                              <ul className="list-disc pl-4 text-[#0F5132] text-sm">
                                {productNames.map((name, idx) => (
                                  <li key={idx}>{name}</li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
