import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
    process.env.VITE_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const userId = "user_3BO9CKZTIlq28RhduZrVSlvg7zM";
const courses = [
  "heridas-infantiles-pareja",
  "constelaciones-familiares",
  "biodescodificacion",
  "masterclass-terapeuticas",
  "talleres-conciencia",
  "tarot-arquetipos"
];

async function unlockAll() {
    console.log(`Checking and unlocking courses for user: ${userId}...`);
    
    for (const courseId of courses) {
        // Check if already exists
        const { data, error: checkError } = await supabase
            .from('enrollments')
            .select('*')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .maybeSingle();

        if (checkError) {
            console.error(`Error checking ${courseId}:`, checkError);
            continue;
        }

        if (data) {
            console.log(`Course ${courseId} is already unlocked.`);
            continue;
        }

        // Insert if not exists
        const { error: insertError } = await supabase
            .from('enrollments')
            .insert({
                user_id: userId,
                course_id: courseId,
                status: 'paid'
            });

        if (insertError) {
            console.error(`Error inserting ${courseId}:`, insertError);
        } else {
            console.log(`Success: Unlocked ${courseId}.`);
        }
    }
}

unlockAll();
