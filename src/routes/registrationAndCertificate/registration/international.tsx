import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/registrationAndCertificate/registration/international',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/registrationAndCertificate/registration/international"!</div>
  )
}
