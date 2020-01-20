<template>
  <header id="header" ref="header">
    <div class="navbar-content">
      <div class="left-side">
        <Logo />
        <AnfisaInfo />
        <div
          class="button-wrapper"
          :style="{
            width: headerHeight + 'px',
            right: -headerHeight / 2 + 'px'
          }"
        >
          <PentagonButton
            :icon="['fas', 'microscope']"
            @click="showWorkspaces = !showWorkspaces"
          />
        </div>
      </div>
      <div class="central-side">
        <WorkspaceInfo />
      </div>
      <div ref="right" class="right-side">
        <div
          class="button-wrapper"
          :style="{
            width: headerHeight + 'px',
            left: -headerHeight / 2 + 'px'
          }"
        >
          <PentagonButton
            :icon="getChartIcon"
          />
        </div>
        <HeaderUserInfo />
      </div>
    </div>
    <BaseModal
      v-show="showWorkspaces"
      :title="title"
      @close="showWorkspaces = false"
    >
      <div slot="body">
        <DefaultList :items="getWorkspaces" @dblclick="selectWorkspace($event)" @click="checkedWorkspace = $event"/>
      </div>
      <div slot="footer" class="footer">
        <AppButton class="btnCancel" @click="showWorkspaces = false">
          Cancel
        </AppButton>
        <AppButton class="btnPrimary" @click="selectWorkspace(checkedWorkspace)">
          Ok
        </AppButton>
      </div>
    </BaseModal>
  </header>
</template>

<script>
  import Logo from "~/components/system/header/Logo.vue"
  import PentagonButton from "~/components/UI/Controls/PentagonButton.vue"
  import HeaderUserInfo from "~/components/system/header/HeaderUserInfo.vue"
  import AnfisaInfo from "~/components/system/header/AnfisaInfo.vue"
  import BaseModal from "~/components/UI/Modals/BaseModal.vue"
  import AppButton from "~/components/UI/Controls/Button.vue"
  import DefaultList from "~/components/UI/lists/DefaultList.vue"
  import WorkspaceInfo from "~/components/system/header/WorkspaceInfo.vue";

  export default {
    name: "Header",
    components: {
      WorkspaceInfo,
      DefaultList,
      AnfisaInfo,
      HeaderUserInfo,
      PentagonButton,
      Logo,
      BaseModal,
      AppButton
    },
    data() {
      return {
        headerHeight: 0,
        title: "Select workspace",
        showWorkspaces: false,
        checkedWorkspace: null
      }
    },
    computed: {
      getWorkspaces() {
        const workspaces = this.$store.getters.getWorkspaces
        return workspaces.map(workspace => workspace.name)
      },
      getChartIcon() {
        const selectedWorkspace = this.$store.getters.getSelectedWorkspace
        if (selectedWorkspace) {
          return ['fas', 'chart-line']
        }
      }
    },
    methods: {
      selectWorkspace(selectedWorkspace) {
        if (selectedWorkspace) {
          this.$router.push({ path: '/variantsTableView', query: { ws: selectedWorkspace } })
        }
        this.showWorkspaces = false
      }
    },
    mounted() {
      this.headerHeight = this.$refs.header.clientHeight
    }
  }
</script>

<style lang="scss">
  header {
    height: 10vh;
    border-bottom: 1px solid $secondary-color;
    @media screen and (max-width: $smDesktopWidth) {
      height: 60px;
    }
  }
  .left-side {
    height: 100%;
    width: 25%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: $secondary-color;
    @media screen and (max-width: $smDesktopWidth) {
      padding-right: 15px;
    }
    .button-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
    }
  }
  .central-side {
    height: 100%;
    width: 50%;
    background-color: $default-color;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right-side {
    height: 100%;
    width: 25%;
    position: relative;
    background-color: $secondary-color;
    padding-left: 35px;
    @media screen and (max-width: $smDesktopWidth) {
      padding-left: 15px;
    }
    .button-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btnCancel {
      width: 20%;
      margin-right: 10px;
    }
    .btnPrimary {
      width: 20%;
    }
  }
</style>
