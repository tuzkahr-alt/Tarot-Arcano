export interface TarotCard {
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  meaning: string;
  image: string;
}

export const MAJOR_ARCANA: TarotCard[] = [
  { id: '0', name: 'El Loco', arcana: 'major', meaning: 'Nuevos comienzos, optimismo, confianza en el universo.', image: 'https://picsum.photos/seed/tarot-0/300/500' },
  { id: '1', name: 'El Mago', arcana: 'major', meaning: 'Acción, conciencia, concentración, poder personal.', image: 'https://picsum.photos/seed/tarot-1/300/500' },
  { id: '2', name: 'La Sacerdotisa', arcana: 'major', meaning: 'Inconsciente, intuición, misterio, pasividad.', image: 'https://picsum.photos/seed/tarot-2/300/500' },
  { id: '3', name: 'La Emperatriz', arcana: 'major', meaning: 'Abundancia, maternidad, naturaleza, fertilidad.', image: 'https://picsum.photos/seed/tarot-3/300/500' },
  { id: '4', name: 'El Emperador', arcana: 'major', meaning: 'Estructura, autoridad, paternidad, regulación.', image: 'https://picsum.photos/seed/tarot-4/300/500' },
  { id: '5', name: 'El Hierofante', arcana: 'major', meaning: 'Educación, creencia, conformidad, tradición.', image: 'https://picsum.photos/seed/tarot-5/300/500' },
  { id: '6', name: 'Los Enamorados', arcana: 'major', meaning: 'Relaciones, sexualidad, valores personales, decisiones.', image: 'https://picsum.photos/seed/tarot-6/300/500' },
  { id: '7', name: 'El Carro', arcana: 'major', meaning: 'Victoria, voluntad, autoafirmación, control.', image: 'https://picsum.photos/seed/tarot-7/300/500' },
  { id: '8', name: 'La Fuerza', arcana: 'major', meaning: 'Paciencia, compasión, fuerza suave, coraje.', image: 'https://picsum.photos/seed/tarot-8/300/500' },
  { id: '9', name: 'El Ermitaño', arcana: 'major', meaning: 'Introspección, búsqueda, soledad, guía interna.', image: 'https://picsum.photos/seed/tarot-9/300/500' },
  { id: '10', name: 'La Rueda de la Fortuna', arcana: 'major', meaning: 'Destino, puntos de inflexión, movimiento, visión personal.', image: 'https://picsum.photos/seed/tarot-10/300/500' },
  { id: '11', name: 'La Justicia', arcana: 'major', meaning: 'Justicia, responsabilidad, decisión, causa y efecto.', image: 'https://picsum.photos/seed/tarot-11/300/500' },
  { id: '12', name: 'El Colgado', arcana: 'major', meaning: 'Sacrificio, liberación, nuevas perspectivas, espera.', image: 'https://picsum.photos/seed/tarot-12/300/500' },
  { id: '13', name: 'La Muerte', arcana: 'major', meaning: 'Finales, transición, eliminación, cambio inexorable.', image: 'https://picsum.photos/seed/tarot-13/300/500' },
  { id: '14', name: 'La Templanza', arcana: 'major', meaning: 'Equilibrio, moderación, paciencia, propósito.', image: 'https://picsum.photos/seed/tarot-14/300/500' },
  { id: '15', name: 'El Diablo', arcana: 'major', meaning: 'Esclavitud, materialismo, ignorancia, desesperanza.', image: 'https://picsum.photos/seed/tarot-15/300/500' },
  { id: '16', name: 'La Torre', arcana: 'major', meaning: 'Cambio repentino, revelación, caída, caos.', image: 'https://picsum.photos/seed/tarot-16/300/500' },
  { id: '17', name: 'La Estrella', arcana: 'major', meaning: 'Esperanza, inspiración, generosidad, serenidad.', image: 'https://picsum.photos/seed/tarot-17/300/500' },
  { id: '18', name: 'La Luna', arcana: 'major', meaning: 'Miedo, ilusión, imaginación, confusión.', image: 'https://picsum.photos/seed/tarot-18/300/500' },
  { id: '19', name: 'El Sol', arcana: 'major', meaning: 'Iluminación, grandeza, vitalidad, seguridad.', image: 'https://picsum.photos/seed/tarot-19/300/500' },
  { id: '20', name: 'El Juicio', arcana: 'major', meaning: 'Juicio, renacimiento, llamado interno, absolución.', image: 'https://picsum.photos/seed/tarot-20/300/500' },
  { id: '21', name: 'El Mundo', arcana: 'major', meaning: 'Integración, logro, viaje, plenitud.', image: 'https://picsum.photos/seed/tarot-21/300/500' },
];
