import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/registrationAndCertificate/harbour')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/registrationAndCertificate/harbour"!</div>
}
