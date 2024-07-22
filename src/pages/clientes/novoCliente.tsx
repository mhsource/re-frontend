import React, { useState, useEffect,useRef } from 'react';
import { getCEP, putLinguagens,postBpmn } from '../../services/apis';


import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

import { v4 as uuidv4 } from 'uuid';
import { ref, set, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";

import {  database } from "../../services/firebase";

import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";

import "@bpmn-io/properties-panel/dist/assets/properties-panel.css";


import BpmnModeler from 'bpmn-js/dist/bpmn-modeler.development';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule
} from 'bpmn-js-properties-panel/dist/bpmn-js-properties-panel.umd';


 import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json'



export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  bpmnXML: string;
}

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

const initialValues: Service = {
  cpfcnpj: '',
  nome: '',
  nascimento: '',
  telefone: '',
  email: '',
  endereco: '',
  bairro: '',
  cidade: '',
  uf: '',
  cep: '',
  numero: ''
};

export default function NovoCliente(props: SimpleDialogProps) {
  const { onClose, open, bpmnXML } = props;

  const canvasRef = useRef(null);
  const propertiesPanelRef = useRef(null);

  const [updatedBpmnXML, setUpdatedBpmnXML] = useState(bpmnXML);


  useEffect(() => {
    if (open && bpmnXML) {
      // Atrasar o carregamento para garantir que o diálogo esteja visível
      const timer = setTimeout(() => {
        loadBpmnXML();
      }, 100); // Ajuste o tempo se necessário

      return () => clearTimeout(timer);
    }
  }, [open, bpmnXML]);



    // Carregue o XML do BPMN 2.0 no viewer.
    async function loadBpmnXML() {

      const container:any = document.querySelector('#js-canvas');

      const propertiesPanel:any = document.querySelector('#js-properties-panel');
  
      const viewer = new BpmnModeler({
        container,
        propertiesPanel: {
          parent: propertiesPanel,
        },
         additionalModules: [
           BpmnPropertiesPanelModule,
           BpmnPropertiesProviderModule,
           CamundaPlatformPropertiesProviderModule
         ],
         moddleExtensions: {
           camunda: CamundaBpmnModdle
         }
      });

      try {
        await viewer.importXML(bpmnXML);

        viewer.on('commandStack.changed', async () => {
          try {
            const { xml } = await viewer.saveXML({ format: true });
            setUpdatedBpmnXML(xml);
          } catch (err) {
            console.error('Erro ao salvar o XML atualizado do BPMN 2.0', err);
          }
        });

      } catch (err) {
        console.error('Erro ao carregar o XML do BPMN 2.0', err);
      }
    }

  
    const handleSave = () => {
      console.log('XML atualizado:', updatedBpmnXML);
      // Faça o que for necessário com o XML atualizado (por exemplo, salvar no servidor)

      postBpmn(updatedBpmnXML)
    };

    const handleEntered = () => {
      if (bpmnXML) {
        loadBpmnXML();
      }
    };

   const [formData, setFormData] = useState<Service>(initialValues);

  const handleClose = () => {
    onClose()
  };

 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
   // const db = database;
   //  set(ref(db, 'clientes/'+uuidv4()),formData );
   // handleClose()
   handleSave()
   handleClose()
  };

  const handleChangeCep = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if(value.length >7){
     const endereco = await getCEP(value)
     setFormData(prevState => ({
      ...prevState,
      "cep": value,
      "endereco": endereco.logradouro,
      "bairro": endereco.bairro,
      "cidade": endereco.localidade,
      "uf": endereco.uf
    }));

    }
  };

  return (
    <Dialog  maxWidth={"xl"} open={open} onClose={onClose}>
      <DialogTitle>Criar Fluxo</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', width: '100%', height: '60vh' }}>
        <div id="js-canvas" style={{ height: '100%', width: '50vw' }}></div>
        <div id="js-properties-panel" style={{ height: '100%', width: '30vw' }}></div>
        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Cadastrar</Button>
      </DialogActions>
    </Dialog>
  );
};
