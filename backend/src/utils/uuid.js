import { v4 as uuidv4 } from 'uuid';

/**
 * Génère un UUID v4 (pour usage dans l'app si besoin en dehors du DB).
 * La base utilise gen_random_uuid() pour les PK ; ce helper sert aux cas
 * où vous voulez générer un UUID côté code (tokens, refs, etc.).
 */
export function generateUUID() {
  return uuidv4();
}

export { v4 as uuidv4 } from 'uuid';
