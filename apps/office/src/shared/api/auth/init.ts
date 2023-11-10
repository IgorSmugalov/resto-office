// import { SignInRequest } from '@libs/schema'
// import { refreshRequestFx, signInRequestFx } from '@shared/api/auth/auth.api'
// import { apiRequestFx, Method, setAuth } from '@shared/request'
// import { attach, sample } from 'effector'
//
// signInRequestFx.use(
//   attach({
//     effect: apiRequestFx,
//     mapParams: (body: SignInRequest) => ({
//       method: Method.post,
//       path: 'auth/sign-in/',
//       body,
//     }),
//   })
// )
//
// refreshRequestFx.use(
//   attach({
//     effect: apiRequestFx,
//     mapParams: () => ({
//       method: Method.post,
//       path: 'auth/refresh',
//     }),
//   })
// )
//
// sample({
//   clock: [refreshRequestFx.doneData, signInRequestFx.doneData],
//   fn: ({ accessToken }) => accessToken,
//   target: setAuth,
// })
