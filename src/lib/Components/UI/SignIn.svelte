<script>
    import { createBubbler, preventDefault } from 'svelte/legacy';

    const bubble = createBubbler();
    import {GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, getRedirectResult} from "firebase/auth";
    import {} from "lucide-svelte"
    import { fireAuth } from "$lib/Firebase";
    let { ...rest } = $props();


    const googleProvider = new GoogleAuthProvider();



    async function SignInGoogle(){

        try{
            const res = await signInWithPopup(fireAuth, googleProvider);


        } catch (err){

        }
    }
    function Logout(){
        signOut(fireAuth)
    }

    let showPassword = false;

    let email = $state("");
    let password = $state("");

    
</script>
<div {...rest}>

    <h2 class="text-xl font-bold text-center my-4">Sign In</h2>

    <button onclick={SignInGoogle} class="flex text-center w-full justify-start font-bold m-auto gap-1 rounded-md p-1 border border-[grey]">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
     <span class="grow">Sign in with Google</span>
    </button>

    <p class="text-center">or</p>
    
    <form onsubmit={preventDefault(bubble('submit'))} class="w-full">
        <label class="block text-xs" for="email">
            Email
        </label>
    
        <input required class="w-full" id="email" bind:value={email} type="text">
        <label class="block text-xs mt-2" for="password">
            Password
        </label>
        <input required class="w-full" id="password" bind:value={password} type="password">

        <div class="my-1">
            <a class="block text-center font-semibold text-accent-1" href="/Create">Create Account</a>
            <a class="block text-center font-semibold text-accent-1" href="/ForgotPassword">Forgot Password?</a>
        </div>
    
        <button class=" block w-fit rounded-md bg-accent-1 m-auto text-white px-2 py-1 text-lg font-bold my-3" type="submit">Sign In</button>
    </form>
    

    
    <button onclick={Logout}>logout</button>
</div>