import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Card, CardContent, Chip } from '@mui/material';
import NovoCliente from './novoCliente';

import EditarCliente from './editarCliente';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { listProcess,getXmlProcess } from '../../services/apis';

import {  database } from "../../services/firebase";
import {  ref,onValue, set, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";
import ExportarExcel from '../../services/xlsx';

// import 'node_modules/@bpmn-io/form-js/dist/assets/form-js-base.css'; // Importe o arquivo CSS aqui
// import "node_modules/@bpmn-io/form-js/dist/assets/form-js.css";
// import "node_modules/@bpmn-io/form-js/dist/assets/form-js-editor-base.css";
// import "node_modules/@bpmn-io/form-js/dist/assets/form-js-editor.css";
// import "node_modules/@bpmn-io/form-js/dist/assets/dragula.css";
// import "node_modules/@bpmn-io/form-js/dist/assets/properties-panel.css";


interface Service {
  cpfcnpj: string;
  nome: string;
  nascimento: string;
  telefone: string;
  email: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  numero: string;
}

interface ServiceTableProps {
  services: any;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

export default function Clientes() {
  const [open, setOpen] = React.useState(false);
  const [opene, setOpene] = React.useState(false);
  const [rows, setRows] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);

  const bpmnXML = 
  `<?xml version="1.0" encoding="UTF-8"?>
  <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
    <bpmn2:process id="Process_1" isExecutable="true" camunda:historyTimeToLive="180">
      <bpmn2:startEvent id="StartEvent_1" name="Inicio">
        <bpmn2:outgoing>Flow_0zc64ia</bpmn2:outgoing>
      </bpmn2:startEvent>
      <bpmn2:serviceTask id="Activity_1yw12i2" name="tarefa">
        <bpmn2:incoming>Flow_0zc64ia</bpmn2:incoming>
        <bpmn2:outgoing>Flow_1f2mns6</bpmn2:outgoing>
      </bpmn2:serviceTask>
      <bpmn2:sequenceFlow id="Flow_0zc64ia" sourceRef="StartEvent_1" targetRef="Activity_1yw12i2" />
      <bpmn2:endEvent id="Event_1cmg8o2" name="Fim">
        <bpmn2:incoming>Flow_1f2mns6</bpmn2:incoming>
      </bpmn2:endEvent>
      <bpmn2:sequenceFlow id="Flow_1f2mns6" sourceRef="Activity_1yw12i2" targetRef="Event_1cmg8o2" />
    </bpmn2:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
        <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
          <dc:Bounds x="122" y="142" width="36" height="36" />
          <bpmndi:BPMNLabel>
            <dc:Bounds x="127" y="185" width="27" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Activity_1yw12i2_di" bpmnElement="Activity_1yw12i2">
          <dc:Bounds x="230" y="120" width="100" height="80" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Event_1cmg8o2_di" bpmnElement="Event_1cmg8o2">
          <dc:Bounds x="512" y="142" width="36" height="36" />
          <bpmndi:BPMNLabel>
            <dc:Bounds x="521" y="185" width="19" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge id="Flow_0zc64ia_di" bpmnElement="Flow_0zc64ia">
          <di:waypoint x="158" y="160" />
          <di:waypoint x="230" y="160" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_1f2mns6_di" bpmnElement="Flow_1f2mns6">
          <di:waypoint x="330" y="160" />
          <di:waypoint x="512" y="160" />
        </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn2:definitions>`

  const [data, setData] = React.useState<any>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpene = async(demanda:any) => {
    const xml = await getXmlProcess(demanda.key)
    setOpene(true);
    setData({demanda,xml})
  };

  const handleClose = async () => {

    const timer = setTimeout(async() => {
  
      await Listar()
      setOpen(false);

    }, 500); // Ajuste o tempo se necessário

    return () => clearTimeout(timer);

  };

  const handleCloseEdit = async () => {
    const timer = setTimeout(async() => {
  
      await Listar()
      setOpene(false);

    }, 500); // Ajuste o tempo se necessário

    return () => clearTimeout(timer);
   };

  const [itens, setItens] = useState([]);

  async function Listar(){

    const listProces = await listProcess()

    console.log(listProces)

    setRows(listProces)
 
  }

  useEffect(() => {
 
    Listar()

  }, []);


  return (
    <>
    <Card sx={{ minWidth: 512, marginBottom:"10px" }}>
      <CardContent>
        <Button style={{margin:'5px'}} variant="outlined" onClick={handleClickOpen}>
        Novo Fluxo
        </Button>

        <NovoCliente
        
        bpmnXML={bpmnXML}
          open={open}
          onClose={handleClose}

        />


   { data && <EditarCliente
        
        selectedValue={data}
          open={opene}
          onClose={handleCloseEdit}

        />

   }


      </CardContent>
    </Card>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="services table">
        <TableHead>
          <TableRow>
            <TableCell>Nome do fluxo</TableCell>
            <TableCell>Versão</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.key}</TableCell>
              <TableCell>{service.version}</TableCell>
              <TableCell>{!service.suspended ? 'Ativo' : 'Desativado'}</TableCell>
              <TableCell>
              <Chip label="Editar" onClick={() => handleClickOpene(service)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

 </>
  );
}