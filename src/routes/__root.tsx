import { Outlet, createRootRoute } from '@tanstack/react-router'
import Main from '@/layout/Main'

export const Route = createRootRoute({
  component: () => (
    <>
      <Main/>
    </>
  ),
})
