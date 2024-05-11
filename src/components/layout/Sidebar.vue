<template>
  <div :class="{ 'is-collapsed': isSidebarCollapsed }">
    <div
      v-if="!isSidebarCollapsed"
      class="backdrop d-xl-none position-fixed top-0 bottom-0 start-0 end-0"
      @click="setIsSidebarCollapsed(true)"
    ></div>

    <aside class="d-flex flex-column vh-100 position-fixed l-0 t-0">
      <div class="inner-item position-relative mb-5">
        <div class="logo d-flex align-items-center">
          <!-- <span class="lh-1 ms-3 title" v-if="!isSidebarCollapsed">
            Halaman Admin
          </span> -->
        </div>

        <a
          class="toggle d-inline-block d-xl-none lh-1 bg-black rounded-circle shadow position-absolute start-100 top-50 translate-middle"
          href="#"
          @click.prevent="setIsSidebarCollapsed(!isSidebarCollapsed)"
        >
          <ChevronRightIcon v-if="isSidebarCollapsed" />
          <ChevronLeftIcon v-else />
        </a>
      </div>

      <nav class="inner-item flex-grow-1 overflow-auto py-0">
        <div v-for="group of filteredGroups" class="mb-4" :key="group.label">
          <div
            class="small text-muted text-uppercase mb-3"
            :class="{ 'd-none': isSidebarCollapsed }"
          >
            {{ group.label }}
          </div>

          <div v-for="item of group.items" class="menu-item" :key="item.path">
            <router-link
              class="align-items-center text-decoration-none rounded-3"
              :to="item.path"
            >
              <i class="lh-1 fs-5">
                <component :is="item.icon" />
              </i>

              <span class="menu-label ms-3">
                {{ item.label }}
              </span>
            </router-link>

            <div v-if="item.items" class="children">
              <div
                v-for="item of item.items"
                class="menu-item"
                :key="item.path"
              >
                <router-link
                  class="text-decoration-none rounded-3"
                  :to="item.path"
                >
                  <span class="menu-label">
                    {{ item.label }}
                  </span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="inner-item d-flex align-items-center">
        <BootstrapDropdown v-if="isSidebarCollapsed">
          <div class="dropdown">
            <a
              class="d-inline-block"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BoxArrowRightIcon
                class="ms-2"
                style="color: red; font-size: 20px"
              />
            </a>

            <div class="dropdown-menu p-3">
              <div class="mb-1">{{ $auth.user.fullname }}</div>
              <a
                class="d-inline-flex text-danger text-decoration-none align-items-center"
                href="#"
                @click.prevent="$auth.logout()"
              >
                <BoxArrowRightIcon class="me-1" />
                Log out
              </a>
            </div>
          </div>
        </BootstrapDropdown>

        <div class="user-text">
          <div>{{ $auth.user.fullname }}</div>
          <a
            class="d-inline-flex text-danger text-decoration-none align-items-center"
            href="#"
            @click.prevent="$auth.logout()"
          >
            <BoxArrowRightIcon class="me-1" />
            Log out
          </a>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import BootstrapDropdown from '../bootstrap/BootstrapDropdown';

import BoxArrowRightIcon from 'bootstrap-icons/icons/box-arrow-right.svg';
import ChevronLeftIcon from 'bootstrap-icons/icons/chevron-left.svg';
import ChevronRightIcon from 'bootstrap-icons/icons/chevron-right.svg';
import LightningIcon from 'bootstrap-icons/icons/lightning.svg';
import PeopleFillIcon from 'bootstrap-icons/icons/people-fill.svg';
import PersonSquareIcon from 'bootstrap-icons/icons/person-square.svg';
import UiChecksGridIcon from 'bootstrap-icons/icons/ui-checks-grid.svg';
import StarListIcon from 'bootstrap-icons/icons/list-stars.svg';
import TagIcon from 'bootstrap-icons/icons/tags.svg';
import QuestionIcon from 'bootstrap-icons/icons/patch-question.svg';
import GraphUpIcon from 'bootstrap-icons/icons/graph-up.svg';
import CourseIcon from 'bootstrap-icons/icons/backpack4.svg';

export default {
  components: {
    BootstrapDropdown,
    BoxArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    StarListIcon,
    TagIcon,
    GraphUpIcon,
    QuestionIcon,
  },

  data() {
    return {
      groups: [
        {
          label: 'Halaman Kelola',
          items: [
            {
              path: '/reports',
              icon: GraphUpIcon,
              label: 'Leaderboard',
              access: 'reports.read',
            },
            {
              path: '/categories',
              icon: TagIcon,
              label: 'Kategori',
              access: 'categories.read',
            },
            {
              path: '/questions',
              icon: QuestionIcon,
              label: 'Pertanyaan',
              access: 'questions.read',
            },
          ],
        },
        {
          label: 'Course',
          items: [
            {
              path: '/courses',
              icon: CourseIcon,
              label: 'Course',
              access: 'course.read',
            },
          ],
        },
        {
          label: 'Pengaturan',
          items: [
            {
              path: '/profile',
              icon: PersonSquareIcon,
              label: 'Edit Profile',
            },
            {
              path: '/users',
              icon: PeopleFillIcon,
              label: 'Users',
              access: 'users.read',
            },
            {
              path: '/roles',
              icon: UiChecksGridIcon,
              label: 'Roles',
              access: 'roles.read',
            },
            // {
            //   path: '/apis',
            //   icon: LightningIcon,
            //   label: 'APIs',
            //   access: 'apis.read',
            // },
          ],
        },
      ],
    };
  },

  computed: {
    ...mapState('layout', ['isSidebarCollapsed']),

    filteredGroups() {
      /**
       * Recursively
       */
      const filterItems = (items) => {
        const result = items.filter((item) => {
          const result = !item.access || this.$auth.user.can(item.access);

          if (result && item.items) {
            item.items = filterItems(item.items);
          }

          return result;
        });

        return result.filter(({ items }) => !items || items.length);
      };

      return filterItems(this.groups);
    },
  },

  watch: {
    '$route.path': {
      handler(path) {
        if (path === '/')
          this.$router.push(this.filteredGroups[0].items[0].path);
      },
      immediate: true,
    },
  },

  methods: {
    ...mapMutations('layout', ['setIsSidebarCollapsed']),
  },
};
</script>

<style lang="scss" scoped>
.backdrop,
aside {
  z-index: $zindex-fixed;
}

.backdrop {
  background: $modal-backdrop-bg;
  opacity: $modal-backdrop-opacity;
}

aside {
  width: rem(280);
  background: $secondary;
  border-right: 2px solid $secondary;

  .is-collapsed & {
    width: rem(70) + $scrollbar-width;
  }
}

.toggle {
  font-size: rem(12);
  color: #e8c872;
  padding: rem(6);
}

.inner-item {
  padding: map-get($spacers, 4);

  @include media-breakpoint-up(xl) {
    padding: map-get($spacers, 5);
  }

  .is-collapsed & {
    padding-left: rem(15);
    padding-right: rem(15);
  }
}

.logo {
  color: white;
  font-weight: 600;
  font-size: rem(16);

  img {
    height: rem(40) + $scrollbar-width;
  }

  .is-collapsed & {
    img {
      height: rem(64);
    }
  }
}

.menu-item {
  a {
    display: flex;
    color: white;
    padding: map-get($spacers, 2);
    margin-bottom: map-get($spacers, 1);
    outline: none;

    &:hover,
    &:focus {
      color: $info;
    }
  }

  .router-link-active {
    background-color: white;

    &,
    &:hover,
    &:focus {
      color: $secondary;
    }
  }

  i {
    padding: rem(10);
  }

  .is-collapsed & {
    a {
      display: inline-flex;
      padding: 0;
      margin-bottom: map-get($spacers, 3);
    }
  }
}

.children {
  padding: map-get($spacers, 2) 0;

  .menu-item {
    a {
      padding: rem(10) rem(18) rem(10) rem(61);
    }

    .router-link-active {
      background-color: rgba(white, 0.25);
      color: $white;
    }
  }

  .router-link-active + & {
    display: block;
  }

  &,
  .is-collapsed & {
    display: none;
  }
}

.menu-label,
.user-text {
  .is-collapsed & {
    display: none;
  }
}

.user-text {
  padding: 0 rem(20);
}
</style>
