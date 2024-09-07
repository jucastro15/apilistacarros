import connection from "./connection.js";

export async function inserirListaCarros(carros) {
    const comando = `
    insert into tb_carro (  ds_marca, ds_modelo, nr_ano, vl_preco, img_Carro, dt_inclusao)
    values (?, ?, ?, ?, ?, sysdate());
    `;

    const resposta = await connection.query(comando, [
        carros.marca,
        carros.modelo,
        carros.ano,
        carros.preco,
        carros.img
    ]);

    let marca = resposta[0]

    return marca.insertId;

};



export async function consultarListaCarros() {
    const comando = `
    select 
    id_carro id,
    ds_marca     marca,
    ds_modelo    modelo,
    nr_ano       ano,
    vl_preco     preco,
    img_Carro    img,
    dt_inclusao  inclusao
    from tb_carro
    `;

    let resposta = await connection.query(comando);
    let registros = resposta[0];

    return registros;
        
};



export async function alterarListaCarros(carros,id) {
    const comando = `
    update tb_carro
    set  ds_marca = ?,
         ds_modelo = ?,
         nr_ano = ?,
         vl_preco = ?,
         img_Carro = ?,
         dt_inclusao = sysdate()
   where id_carro = ?;
         `;

         let resposta = await connection.query(comando,
            [
            carros.marca,
            carros.modelo,
            carros.ano,
            carros.preco,
            carros.img,
            id
        ])

            let marca = resposta[0]
            let info = marca.affectedRows

            return info;
};



export async function removerListaCarros(id) {
    const comando = `
    delete from tb_carro
    where id_carro = ?
    `;

    let resposta = await connection.query(comando, [id]);
    let marca = resposta[0];

    return marca.affectedRows;
};
    
