'use client'

import { $authUser } from '@entities/authenticated-user/model/model'
import { Typography } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'
import { ContentBlock } from '@shared/ui'
import { useUnit } from 'effector-react'

function Profile() {
  const [user] = useUnit([$authUser])

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <ContentBlock>
          <Grid container spacing={4} alignItems="center">
            <Grid xs={12}>
              <Typography component="h2" variant="h5">
                Данные пользователя
              </Typography>
            </Grid>
            <Grid xs={4}>Email: </Grid>
            <Grid xs={8}>{user?.email}</Grid>
          </Grid>
        </ContentBlock>
      </Grid>
    </Grid>
  )
}

export default Profile
