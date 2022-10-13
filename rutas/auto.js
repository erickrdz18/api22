const {Router}= require('express');
const router = Router();

const {getAuto, NuevoAuto, BusquedaIDAuto, BorrarAuto, ActualizarAuto}=require('../controles/auto')

router.get('/auto', getAuto);
router.post('/auto', NuevoAuto);
router.get('/auto/:id_auto', BusquedaIDAuto);
router.delete('/auto/:id_auto', BorrarAuto);
router.put('/auto/:id_auto', ActualizarAuto);


module.exports=router;

