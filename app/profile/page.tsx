import { supabase } from "@/lib/supabase";

export default function Profile(){
    const setProfile = async () => {
        const {data, error} = await supabase.from("views").insert({
            name: 'random name'
        });

        if(data) console.log(data)
        if(error) console.log(error)
    };

    setProfile();
    return <div>hello</div>
}