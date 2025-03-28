import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import Link from "next/link";

interface Profile {
  id: number;
  nome: string;
  photos: string[];
  vphotos: string[];
  stories: string[];
  userUID?: string;
  description?: string;
  tag?: string;
  tagtimestamp?: Date;
  tarifa: number;
  lingua: string[];
  telefone: string;
  email: string;
  idade: number;
  altura: string;
  distrito: string;
  origem: string;
  cidade: string;
  address: string;
  latitude: number;
  longitude: number;
  peso: string;
  tatuagem: string;
  pelos: string;
  olhos: string;
  seios: string;
  mamas: string;
  signo: string;
  pagamento: string[];
  inactive: boolean;
  certificado: boolean;
  live?: boolean;
  comment?: string[];
  premium: boolean;
  created_at?: string;
  last_login?: string;
  payment_history?: { date: string; amount: number; status: string }[];
}

interface ProfileCardProps {
  profile: Profile;
  selectedItems: Set<string | number>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<string | number>>>;
  handleToggleField: (userUID: string, field: keyof Profile, currentValue: boolean) => void;
  handleDeleteProfile: (userUID: string) => void;
}

export default function ProfileCard({
  profile,
  selectedItems,
  setSelectedItems,
  handleToggleField,
  handleDeleteProfile,
}: ProfileCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedItems);
    if (selectedItems.has(profile.userUID!)) newSelected.delete(profile.userUID!);
    else newSelected.add(profile.userUID!);
    setSelectedItems(newSelected);
  };

  const handleSwitchClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accordion from toggling
  };

  return (
    <Accordion type="single" collapsible className="mb-4">
      <AccordionItem value={profile.userUID!} className="border-b-0">
        <div className="bg-pink-50 dark:bg-[#300d1b] rounded-2xl hover:bg-pink-200 dark:hover:bg-[#5a2e3f] transition-colors duration-200">
          <AccordionTrigger className="grid grid-cols-12 gap-4 items-center p-4 text-left no-underline hover:no-underline">
            <div className="col-span-1 flex justify-center">
              <Checkbox
                checked={selectedItems.has(profile.userUID!)}
                onClick={handleCheckboxClick}
                className="h-5 w-5 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="col-span-3 min-w-0">
              <span className="font-semibold text-gray-900 dark:text-white block truncate">{profile.nome}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 block truncate">({profile.email})</span>
            </div>
            <div className="col-span-2 flex justify-center items-center space-x-2">
              <Switch
                checked={!profile.inactive} // Active = !inactive
                onCheckedChange={(checked) => handleToggleField(profile.userUID!, "inactive", !checked)} // Invert checked value for inactive
                onClick={handleSwitchClick}
                className="data-[state=checked]:bg-green-600"
              />
              <Label className="text-sm text-gray-700 dark:text-gray-300">
                {profile.inactive ? "Inativo" : "Ativo"}
              </Label>
            </div>
            <div className="col-span-2 flex justify-center items-center space-x-2">
              <Switch
                checked={profile.premium}
                onCheckedChange={() => handleToggleField(profile.userUID!, "premium", profile.premium)}
                onClick={handleSwitchClick}
                className="data-[state=checked]:bg-blue-600"
              />
              <Label className="text-sm text-gray-700 dark:text-gray-300">
                {profile.premium ? "Sim" : "Não"}
              </Label>
            </div>
            <div className="col-span-2 flex justify-center items-center space-x-2">
              <Switch
                checked={profile.certificado}
                onCheckedChange={() => handleToggleField(profile.userUID!, "certificado", profile.certificado)}
                onClick={handleSwitchClick}
                className="data-[state=checked]:bg-yellow-600"
              />
              <Label className="text-sm text-gray-700 dark:text-gray-300">
                {profile.certificado ? "Sim" : "Não"}
              </Label>
            </div>
            <div className="col-span-2 flex justify-center items-center space-x-2">
              <Link href={`/escort/${profile.nome}`} target="_blank">
                <Button
                  className="rounded-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ver Perfil
                </Button>
              </Link>
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="rounded-full bg-red-600 hover:bg-red-700 text-white px-4 py-1 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Excluir
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-[#1a0a10] rounded-lg">
                  <DialogHeader>
                    <DialogTitle>Confirmar Exclusão</DialogTitle>
                    <DialogDescription>
                      Tem certeza de que deseja excluir o perfil de {profile.nome}? Esta ação é irreversível.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleDeleteProfile(profile.userUID!);
                        setIsDeleteDialogOpen(false);
                      }}
                    >
                      Excluir
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-6 bg-white dark:bg-[#1a0a10] rounded-b-2xl border border-pink-100 dark:border-[#2D3748] mt-1 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Informações Básicas</h3>
                <Separator className="bg-gray-200 dark:bg-[#4A5568]" />
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  <p><strong>Nome:</strong> {profile.nome}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Telefone:</strong> {profile.telefone}</p>
                  <p><strong>Idade:</strong> {profile.idade}</p>
                  <p><strong>Tarifa:</strong> {profile.tarifa}€</p>
                  <p><strong>Línguas:</strong> {profile.lingua?.join(", ") || "N/A"}</p>
                  <p><strong>Pagamentos:</strong> {profile.pagamento?.join(", ") || "N/A"}</p>
                  <p><strong>Criado em:</strong> {profile.created_at ? new Date(profile.created_at).toLocaleDateString("pt-PT") : "N/A"}</p>
                  <p><strong>Último Login:</strong> {profile.last_login ? new Date(profile.last_login).toLocaleDateString("pt-PT") : "N/A"}</p>
                </div>
              </div>

              {/* Localização e Características */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Localização</h3>
                <Separator className="bg-gray-200 dark:bg-[#4A5568]" />
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  <p><strong>Distrito:</strong> {profile.distrito}</p>
                  <p><strong>Cidade:</strong> {profile.cidade}</p>
                  <p><strong>Origem:</strong> {profile.origem}</p>
                  <p><strong>Endereço:</strong> {profile.address}</p>
                  <p><strong>Latitude:</strong> {profile.latitude}</p>
                  <p><strong>Longitude:</strong> {profile.longitude}</p>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Características Físicas</h3>
                <Separator className="bg-gray-200 dark:bg-[#4A5568]" />
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  <p><strong>Altura:</strong> {profile.altura}</p>
                  <p><strong>Peso:</strong> {profile.peso}</p>
                  <p><strong>Olhos:</strong> {profile.olhos}</p>
                  <p><strong>Cabelo:</strong> {profile.mamas}</p>
                  <p><strong>Tatuagem:</strong> {profile.tatuagem}</p>
                  <p><strong>Pelos:</strong> {profile.pelos}</p>
                  <p><strong>Seios:</strong> {profile.seios}</p>
                  <p><strong>Signo:</strong> {profile.signo}</p>
                </div>
              </div>

              {/* Mídia e Pagamentos */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mídia</h3>
                <Separator className="bg-gray-200 dark:bg-[#4A5568]" />
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">Fotos</p>
                    <div className="grid grid-cols-2 gap-4">
                      {profile.photos.length > 0 ? (
                        profile.photos.slice(0, 4).map((photo, idx) => (
                          <Image
                            key={idx}
                            src={photo}
                            alt="Foto"
                            width={100}
                            height={100}
                            className="rounded-lg object-cover w-full h-24 shadow-sm hover:shadow-md transition-shadow"
                          />
                        ))
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 col-span-full">Nenhuma foto disponível</p>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Histórico de Pagamentos</h3>
                <Separator className="bg-gray-200 dark:bg-[#4A5568]" />
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  {profile.payment_history && profile.payment_history.length > 0 ? (
                    profile.payment_history.slice(0, 3).map((payment, idx) => (
                      <p key={idx}>
                        <strong>{new Date(payment.date).toLocaleDateString("pt-PT")}:</strong> {payment.amount}€ - {payment.status}
                      </p>
                    ))
                  ) : (
                    <p>Nenhum pagamento registrado</p>
                  )}
                </div>
              </div>
            </div>
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
}