import roomTypeRoute from './roomType.route';
import roomRoute from './rooms.routes';
import authRoute from './auth.routes';
import { Router } from 'express';


export default (router:Router)=>{
  router.use("/v1", roomTypeRoute);
  router.use("/v1", roomRoute);
  router.use("/v1",authRoute);

  return router;
};
