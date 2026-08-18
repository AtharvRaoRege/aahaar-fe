import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { InstallHint } from '@/components/global/install-hint'
import { StaffGate } from '@/components/dashboard/staff-gate'
import { ProtectedRoute } from '@/components/global/protected-route'
import { CustomerLayout } from '@/pages/customer/layout'
import { CartPage } from '@/pages/customer/cart'
import { MenuPage as CustomerMenuPage } from '@/pages/customer/menu'
import { OrderTrackingPage } from '@/pages/customer/order-tracking'
import { ReviewPage } from '@/pages/customer/review'
import { WelcomePage } from '@/pages/customer/welcome'
import { LandingPage } from '@/pages/landing'
import { AdminPage } from '@/pages/dashboard/admin'
import { DashboardLayout } from '@/pages/dashboard/layout'
import { LoginPage } from '@/pages/dashboard/login'
import { MenuManagerPage } from '@/pages/dashboard/menu'
import { OrdersPage } from '@/pages/dashboard/orders'
import { PhonePage } from '@/pages/dashboard/phone'
import { QrPage } from '@/pages/dashboard/qr'
import { RatingsPage } from '@/pages/dashboard/ratings'
import { SettingsPage } from '@/pages/dashboard/settings'
import { SetupPage } from '@/pages/dashboard/setup'
import { SsoCallbackPage } from '@/pages/dashboard/sso-callback'
import { WaitlistPage } from '@/pages/dashboard/waitlist'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.querySelectorAll('[data-scroll-root]').forEach((node) => {
      if (node instanceof HTMLElement) {
        node.scrollTo({ top: 0, left: 0 })
      }
    })
  }, [pathname])

  return null
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <InstallHint />
      <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/r/:slug" element={<CustomerLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="menu" element={<CustomerMenuPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="track/:orderId" element={<OrderTrackingPage />} />
      </Route>

      <Route path="/dashboard/login" element={<LoginPage />} />
      <Route path="/dashboard/sso-callback" element={<SsoCallbackPage />} />

      <Route
        element={
          <ProtectedRoute>
            <StaffGate />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard/phone" element={<PhonePage />} />
        <Route path="/dashboard/waitlist" element={<WaitlistPage />} />
        <Route path="/dashboard/setup" element={<SetupPage />} />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout />
          }
        >
          <Route index element={<OrdersPage />} />
          <Route path="menu" element={<MenuManagerPage />} />
          <Route path="qr" element={<QrPage />} />
          <Route path="ratings" element={<RatingsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}
