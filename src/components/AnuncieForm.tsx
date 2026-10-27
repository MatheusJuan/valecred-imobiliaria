"use client";

import { useState } from "react";
import { cities, filterOptions } from "@/mvp-data";

// MVP: não envia nada. Na fase B vira uma "solicitação" pendente no admin
// (fotos para o R2, Turnstile e aviso por Resend).
export default function AnuncieForm() {
  const [sent, setSent] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  if (sent) {
    return (
      <p className="rounded-card bg-surface p-8 text-center text-sm font-medium text-brand">
        Recebemos o seu anúncio (demonstração do MVP). Nosso time vai analisar e entrar em contato!
      </p>
    );
  }
  const lbl = "block text-sm font-medium";
  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <h3 className="text-lg font-bold md:col-span-2">Seus dados</h3>
      <label className={lbl}>Nome *<input required name="name" className="field mt-1" /></label>
      <label className={lbl}>Telefone *<input required name="phone" inputMode="tel" className="field mt-1" /></label>
      <label className={`${lbl} md:col-span-2`}>E-mail<input type="email" name="email" className="field mt-1" /></label>

      <h3 className="mt-4 text-lg font-bold md:col-span-2">Sobre o imóvel</h3>
      <label className={lbl}>Finalidade *
        <select required name="status" className="field mt-1" defaultValue="">
          <option value="" disabled>Selecione</option>
          <option>Venda</option>
          <option>Aluguel</option>
        </select>
      </label>
      <label className={lbl}>Tipo *
        <select required name="category" className="field mt-1" defaultValue="">
          <option value="" disabled>Selecione</option>
          {filterOptions.categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <label className={lbl}>Preço pretendido (R$)<input type="number" min={0} name="price" className="field mt-1" /></label>
      <label className={lbl}>Área (m²)<input type="number" min={0} name="area" className="field mt-1" /></label>
      <label className={lbl}>Cidade *
        <select required name="city" className="field mt-1" defaultValue="">
          <option value="" disabled>Selecione</option>
          {cities.map((c) => <option key={c.name}>{c.name}</option>)}
        </select>
      </label>
      <label className={lbl}>Bairro *<input required name="neighborhood" className="field mt-1" /></label>
      <label className={`${lbl} md:col-span-2`}>Endereço<input name="address" className="field mt-1" /></label>
      <label className={`${lbl} md:col-span-2`}>Descrição<textarea name="description" rows={4} className="field mt-1" /></label>
      <label className={`${lbl} md:col-span-2`}>Fotos
        <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="field mt-1" onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))} />
        {files.length > 0 && <span className="mt-1 block text-xs text-muted">{files.length} arquivo(s) selecionado(s)</span>}
      </label>
      <button type="submit" className="btn-primary md:col-span-2">Enviar anúncio</button>
    </form>
  );
}
