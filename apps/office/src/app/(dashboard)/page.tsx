'use client'

import { Typography } from '@mui/material'
import { $accessToken } from '@shared/request'
import { useStore } from 'effector-react'

function Home() {
  const token = useStore($accessToken)

  return (
    <main>
      <Typography variant="h5">Hello, your token: {token}</Typography>
    </main>
  )
}

// export default withAuth(Home)
export default Home
