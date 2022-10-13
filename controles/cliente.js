const { response } = require("express");
const express = require ("express");
const { Pool } = require("pg");
const {config}= require("../config");
const dbCon = config.db;

const pooldb = new Pool(dbCon);

const getClientes= async(req, resp)=>{
        let cliente= await pooldb.connect();
        const resultado = await cliente.query("SELECT * FROM cliente");
        cliente.release();
        resp.send(resultado.rows);
    };

const NuevoCliente= async(req, resp)=>{
    let cliente= await pooldb.connect();
    const { id_cliente, nombre, apellido, email} = req.body;
    const response = await cliente.query('INSERT INTO cliente(id_cliente, nombre, apellido, email) VALUES ($1,$2,$3,$4)', [id_cliente, nombre, apellido, email]);
    console.log(response);
    resp.send('El cliente fue dado de Alta');
}

const BusquedaIDcliente=async(req, resp)=>{
    let cliente= await pooldb.connect();
    const id_cliente=req.params.id_cliente;
    const resultado = await cliente.query("SELECT * FROM cliente where id_cliente = $1", [id_cliente]);
    resp.json(resultado.rows);

}

const BorrarCliente= async(req, resp)=>{
    let cliente= await pooldb.connect();
    const id_cliente=req.params.id_cliente;
    const resultado = await cliente.query("DELETE FROM cliente where id_cliente = $1", [id_cliente]);
    console.log(resultado);
    resp.json('El usuario ha sido dado de baja.');
}

const ActualizarCliente= async(req, resp)=>{
    let cliente= await pooldb.connect();
    const id_cliente = req.params.id_cliente;
    const { nombre, apellido, email} = req.body;
    const resultado = await cliente.query("UPDATE cliente SET nombre=$1, apellido=$2, email=$3 where id_cliente = $4", [nombre,apellido,email,id_cliente]);
    console.log(resultado);
    resp.json('El cliente fue dado de actualizado');

}

module.exports={
    getClientes,
    NuevoCliente,
    BusquedaIDcliente,
    BorrarCliente,
    ActualizarCliente
}


