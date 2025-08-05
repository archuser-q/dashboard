import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/registrationAndCertificate/certificate/international',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/registrationAndCertificate/certificate/international"!</div>
  )
}
