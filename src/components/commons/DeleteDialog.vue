<template>
    <div class="modal fade" id="warningDeleteModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-danger" id="exampleModalLabel">{{ dialogMessage.title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    {{ dialogMessage.body }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                        @click="$emit('deleteItem', dialogMessage.indexDelete)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        dialogMessage: {
            type: Object,
            default: null
        }
    }
}
</script>