const {Router}= require('express');
const router = Router();

const {getClientes, NuevoCliente, BusquedaIDcliente, BorrarCliente, ActualizarCliente}=require('../controles/cliente')

router.get('/cliente', getClientes);
router.post('/cliente', NuevoCliente);
router.get('/cliente/:id_cliente', BusquedaIDcliente);
router.delete('/cliente/:id_cliente', BorrarCliente);
router.put('/cliente/:id_cliente', ActualizarCliente);


module.exports=router;


