<template>
    <div>
        <div class="mb-4">
            <div class="flex items-center">
                <FrugalSvgQRCode/>
                <div class="ml-4 gap-4">
                    <div>QR Code to register for exam</div>
                    <Button size="small">Print</Button>
                    <Button size="small">Copy Link</Button>
                </div>
            </div>
        </div>
        <div>How will the exam be taken?</div>
        <SelectButton v-model="administerMedium" :options="['Paper', 'On Device']" multiple aria-labelledby="basic" />

        <div v-if="administerMedium.includes('On Device')" class="mt-4">
            <div>Which devices?</div>
            <SelectButton v-model="devicesAllowed" :options="['Only provided', 'Bring your own device']" aria-labelledby="basic" />
        </div>
    </div>
</template>

<script setup lang="ts">

const administerMedium = ref([]);
const devicesAllowed = ref('Bring your own device');
</script>
