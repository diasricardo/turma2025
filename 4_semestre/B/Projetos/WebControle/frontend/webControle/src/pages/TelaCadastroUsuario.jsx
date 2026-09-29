import CadastroUsuario from '../components/CadastroUsuario';

export default function TelaCadastroUsuario(){
      return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Cadastro de Crachá RFID
      </h1>
      
      {/* Chamada do componente */}
      <CadastroUsuario />
    </div>
  );
}