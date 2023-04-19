
import { AngryBirds } from '~/.nuxt/components';


import { NuxtLayout } from '~/.nuxt/components';

<template>
    <div class="h-full">
        <NuxtLayout name="student-portal">
            <ClientOnly>
                <AngryBirds />
            </ClientOnly>
        </NuxtLayout>
    </div>
</template>
