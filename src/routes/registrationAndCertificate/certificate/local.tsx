import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/registrationAndCertificate/certificate/local',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/registrationAndCertificate/certificate/local"!</div>
}
