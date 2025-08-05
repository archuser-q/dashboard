import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/registrationAndCertificate/registration/local',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/registrationAndCertificate/registration/local"!</div>
}
