const { response } = require("express");
const express = require ("express");
const { Pool } = require("pg");
const {config}= require("../config");
const dbCon = config.db;
const pooldb = new Pool(dbCon);


const getAuto= async(req, resp)=>{
        let auto= await pooldb.connect();
        const resultado = await auto.query("SELECT * FROM auto");
        auto.release();
        resp.send(resultado.rows);
    };

const NuevoAuto= async(req, resp)=>{
    let auto= await pooldb.connect();
    const { id_auto, marca, modelo, placa,color,id_cliente} = req.body;
    const response = await auto.query('INSERT INTO auto(id_auto, marca, modelo, placa,color,id_cliente) VALUES ($1,$2,$3,$4,$5,$6)', [id_auto, marca, modelo, placa,color,id_cliente]);
    console.log(response);
    resp.send('El auto fue dado de Alta');
}

const BusquedaIDAuto=async(req, resp)=>{
    let auto= await pooldb.connect();
    const id_auto=req.params.id_auto;
    const resultado = await auto.query("SELECT * FROM auto where id_auto = $1", [id_auto]);
    resp.json(resultado.rows);

}

const BorrarAuto= async(req, resp)=>{
    let auto= await pooldb.connect();
    const id_auto=req.params.id_auto;
    const resultado = await auto.query("DELETE FROM auto where id_auto = $1", [id_auto]);
    console.log(resultado);
    resp.json('El auto ha sido dado de baja.');
}

const ActualizarAuto= async(req, resp)=>{
    let auto= await pooldb.connect();
    const id_auto = req.params.id_auto;
    const { marca, modelo, placa,color,id_cliente} = req.body;
    const resultado = await auto.query("UPDATE auto SET marca=$1, modelo=$2, placa=$3, color=$4, id_cliente=$5 where id_auto = $6", [marca, modelo, placa,color,id_cliente,id_auto]);
    console.log(resultado);
    resp.json('El auto fue dado de actualizado');

}

module.exports={
    getAuto,
    NuevoAuto,
    BorrarAuto,
    ActualizarAuto,
    BusquedaIDAuto
}


