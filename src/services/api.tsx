/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";
import { Columns, Database } from "./types";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTasks = async (): Promise<any> => {
  let { data: TaskManager, error } = await supabase
    .from("TaskManager")
    .select("*");
  return { TaskManager, error };
};

export const insertTasks = async (value: any): Promise<any> => {
  const { data, error } = await supabase
    .from("TaskManager")
    .insert([value])
    .select("*");

  return { data, error };
};
export const updateTasks = async (
  id: number,
  column: Columns,
  value: unknown
): Promise<any> => {
  const { data: TaskManager, error } = await supabase
    .from("TaskManager")
    .update({ [column]: value })
    .eq("id", id)
    .select("*");

  return { TaskManager, error };
};
export const deleteTasks = async (id: number): Promise<any> => {
  const { error } = await supabase.from("TaskManager").delete().eq("id", id);

  return { error };
};

export default supabase;
