import axios from "axios";

const postBpmn = async (xml:any) => {
  try {

    const formData = new FormData();

    formData.append('diagram_1.bpmn', new Blob([xml], { type: 'text/xml' }), 'diagram_1.bpmn');

     const response = await axios.post('http://localhost:8080/engine-rest/deployment/create', formData, {
      headers: {
        'accept': 'application/json',
        'accept-language': 'pt-BR',
        'authorization': 'undefined',  // Substitua pelo token de autenticação, se necessário
        'Content-Type': 'multipart/form-data' // Axios define o boundary automaticamente
      }
    })

    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const listProcess = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:8080/engine-rest/process-definition?latest=true&active=true&startableInTasklist=true&startablePermissionCheck=true&firstResult=0&maxResults=15'
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const getXmlProcess = async (key:any) => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/engine-rest/process-definition/key/${key}/xml`
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const listTipoAplicacoes = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:4000/tipo-aplicacoes'
       })
      return response.data
    } catch (err) {
      console.log("Error", err);
      return []
    }
};

const putTipoAplicacoes = async (codigo:String) => {
    try {
      const response = await axios({
        method: 'put',
        url: 'http://localhost:4000/tipo-aplicacoes',
        data:{codigo}
       })
      return response.data
    } catch (err) {
      console.log("Error", err);
      return []
    }
};

const listLinguagens = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:4000/linguagem'
       })
      return response.data
    } catch (err) {
      console.log("Error", err);
      return []
    }
};

const putLinguagens = async (codigo:String) => {
    try {
      const response = await axios({
        method: 'put',
        url: 'http://localhost:4000/linguagem',
        data:{codigo}
       })
      return response.data
    } catch (err) {
      console.log("Error", err);
      return []
    }
};

const listTemplate = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:4000/template'
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const getTemplateFromTipo = async (tipo:String) => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://localhost:4000/template/${tipo}`
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const putTemplate = async (payload:any) => {
  try {
    const response = await axios({
      method: 'put',
      url: 'http://localhost:4000/template',
      data:payload
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const listProjecsAzure = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:4000/azure-projetos'
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const listProjecsGitlab = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:4000/gitlab-projetos'
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const listSistemas = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:4000/sistemas'
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const putSistemas = async (payload:any) => {
  try {
    const response = await axios({
      method: 'put',
      url: 'http://localhost:4000/sistemas',
      data:payload
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const ProjectForSigla = async (payload:any) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:4000/projetos-sybase',
      data:payload
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const listRepositoryTemplates = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:4000/azure-portal'
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const getCodigoAplicacao = async (sigla:String) => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://localhost:4000/codigo-aplicacao/${sigla}`
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const putAplicacoes = async (payload:any) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:4000/provisionar-aplicacao',
      data:payload
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const listAplicacoes = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://localhost:4000/aplicacoes`
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};


const getToken = async (code:String) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:4000/token',
      data:{code}
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const getCEP = async (cep:String) => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://viacep.com.br/ws/${cep}/json/`
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

const getDemandas = async (cep:String) => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://viacep.com.br/ws/${cep}/json/`
     })
    return response.data
  } catch (err) {
    console.log("Error", err);
    return []
  }
};

export {
    listTipoAplicacoes,
    putTipoAplicacoes,
    listLinguagens,
    putLinguagens,
    listTemplate,
    putTemplate,
    listProjecsAzure,
    listProjecsGitlab,
    listSistemas,
    putSistemas,
    ProjectForSigla,
    getTemplateFromTipo,
    listRepositoryTemplates,
    getCodigoAplicacao,
    putAplicacoes,
    listAplicacoes,
    getToken,
    getCEP,
    postBpmn,
    listProcess,
    getXmlProcess
}