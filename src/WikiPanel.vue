<template>
  <div
      class="c-wiki-panel"
      :class="{
          'border-none': borderNone,
          'm-detail-scene': wikiPost || scene === 'detail'
      }"
  >
    <div class="m-panel-head">
      <slot name="head-before"></slot>
      <div class="m-panel-actions">
        <QRcode v-if="wikiPost" class="u-qr"/>
        <slot name="head-actions"></slot>
      </div>
      <div class="m-panel-title">
        <slot name="head-title"></slot>
      </div>
      <slot name="head-after"></slot>
    </div>
    <div class="m-panel-body">
      <slot name="body-before"></slot>
      <div class="m-wiki-metas" v-if="wikiPost">
        <!-- 热度 -->
        <div class="u-meta" v-if="stat">
          <em class="u-label">热度</em>
          <span class="u-value" v-text="stat.views"></span>
        </div>
        <!-- 参与贡献 -->
        <div class="u-meta">
          <em class="u-label">参与贡献</em>
          <a
              class="u-value u-creator"
              v-for="(user,key) in wikiPost.users"
              :key="key"
              target="_blank"
              :href="user.id ? author_url(user.id) : null"
          >
            <img :src="thumbnail_url(user.avatar, 24)" :alt="user.nickname" :title="user.nickname">
          </a>
        </div>
        <!-- 更新时间 -->
        <div class="u-meta">
          <em class="u-label">更新时间</em>
          <span class="u-value" v-text="ts2str(wikiPost.post.updated)"></span>
        </div>
      </div>
      <slot name="body"></slot>
      <slot name="body-after"></slot>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import QRcode from '../src/QRcode'
import {getThumbnail, authorLink, ts2str} from '@jx3box/jx3box-common/js/utils'
import {getStat} from "@jx3box/jx3box-common/js/stat";

export default {
  name: "WikiPost",
  props: [
    "scene",
    "wikiPost",
    'borderNone',
  ],
  data() {
    return {
      stat: null,
    }
  },
  computed: {
    type() {
      let type = _.get(this.wikiPost, 'post.type');
      if (type === 'achievement') type = 'cj';
      return type ? type : null;
    },
    source_id() {
      let source_id = _.get(this.wikiPost, 'post.source_id') ||
          _.get(this.wikiPost, 'source.id') ||
          _.get(this.wikiPost, 'source.ID');
      return source_id ? source_id : null;
    },
  },
  watch: {
    wikiPost() {
      if (!this.wikiPost) return;

      // 获取热度信息
      if (this.type && this.source_id) {
        getStat(this.type, this.source_id).then((data) => {
          if (data.status === 200) this.stat = data.data;
        });
      }
    }
  },
  methods: {
    thumbnail_url: getThumbnail,
    author_url: authorLink,
    ts2str,
  },
  components: {
    QRcode,
  }
};
</script>

<style lang="less">
@import "../assets/css/wiki-panel.less";
</style>