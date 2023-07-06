import React from 'react';
import axios from 'axios';
import './InfoPerfil.css'
import { useState } from "react";


function InfoPerfil(){
    const [UserName, setUserName] = useState ("");
    const [Name, setName] = useState ("Aguardando...");
    const [Bio, setBio] = useState ("Aguardando...");
    const [AvatarUrl, setAvatarUrl] = useState ("");

    

    const PassandoDados = () => {
        try{
 
            axios.get(`https://api.github.com/users/${UserName}`)
                .then(async res =>{
                        let data = await res.data
                        setName(data.name);
                        setBio(data.bio);
                        setAvatarUrl(data.avatar_url)})

                        axios.get(`https://api.github.com/users/${UserName}/repos`)
                            .then(async repo =>{
                                let dados = await repo.data
                                const table = document.createElement('table');
                                for(let pessoas of dados){
                                    console.log(dados)
                                    
                                    let tr = document.createElement('tr');
                                    let td = document.createElement('td');
                                    td.innerHTML = pessoas.name;
                                    tr.appendChild(td);

                                    td = document.createElement('td');
                                    td.innerHTML = pessoas.html_url;
                                    tr.appendChild(td);

                                    td = document.createElement('td');
                                    td.innerHTML = pessoas.language;
                                    tr.appendChild(td);

                                    td = document.createElement ('td');
                                    td.innerHTML = pessoas.created_at
                                    tr.appendChild(td);

                                    table.appendChild(tr)
                                }
                                
                                const resultado = document.querySelector('.tabela');
                                resultado.appendChild(table)

                                })}

        catch(error){
            console.log(error);
        }};

    return(
        <>
        <div className="DivisaoPerfil">
                <h3>Buscador GITHUB</h3>
                <input
                type="text"
                placeholder="Digite um username"
                value={UserName}
                onChange={e => setUserName(e.target.value)}
                />
                <button className='BotaoBuscar' onClick={PassandoDados} >Buscar</button>
                <div className="DivisaoResposta">
                
                    <div>
                        <img src={AvatarUrl} alt="Perfil" />
                        <h1>{Name}</h1>
                        <p>{Bio}</p>
                    </div>
                </div>            
        </div>
        <div className='linePerfil'></div>
        <div className='repositorios'>
            <div className='tabela1'>
                <table>
                    <tr>
                        <td><strong>Repositorio</strong></td>
                        <td><strong>URL</strong></td>
                        <td><strong>Linguagem</strong></td>
                        <td><strong>  Data</strong></td>
                    </tr>
                </table>
                </div>
                <div className='tabela'>
                </div>

        </div>
        </>
        
    )
}
export default InfoPerfil;