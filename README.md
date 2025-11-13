# Foundation

React Native
Expo
Android Studio
Xcode
JavaScript
TypeScript
Node.js

Backend & API:

Node.js
Django
Firebase
Supabase
MongoDB
PostgreSQL
MySQL
GraphQL

🧪 Testing:

Jest
Postman

DevOps / CI-CD:

Foundation is a robust React Native starter template that combines TypeScript, NativeWind styling, and a suite of reusable UI primitives and context providers to accelerate the development of production-grade mobile applications. It features strict compiler settings, preconfigured tooling, and a growing collection of global UI utilities such as alerts, loaders, and snackbars.

## Feature Highlights

- **Strict TypeScript Setup** - Enforces type safety with sensible defaults to catch issues early (`tsconfig.json`).
- **NativeWind + TailwindCSS Styling** - Project-specific design tokens and a `cn` helper for composing utility classes (`global.css`, `tailwind.config.js`, `lib/utils.ts`).
- **Reusable Global Components** - Button, AlertBox, SkeletonLoader, and Snackbar components (`src/components/globalComponents`).
- **Context-Driven UI Services** - Alert, Loader, and Snackbar providers for consistent application feedback (`src/contexts`).
- **Navigation Scaffolding** - Pre-built authentication and application stacks (`src/navigation`).

## Tech Stack

- [React Native 0.82.1](https://reactnative.dev/) + [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [React Navigation 7](https://reactnavigation.org/) (Native Stack)
- [NativeWind](https://www.nativewind.dev/) with TailwindCSS
- UI Enhancements: `react-native-safe-area-context`, `react-native-linear-gradient`, `react-native-vector-icons`, `lucide-react-native`
- Tooling: ESLint, Prettier, Jest

## Project Structure

```
Foundation/
├── App.tsx                          # Main app entry point
├── global.css                       # Global TailwindCSS styles
├── lib/
│   └── utils.ts                     # Utility functions (cn helper)
├── src/
│   ├── components/
│   │   └── globalComponents/        # Reusable UI components
│   │       ├── Alertbox.tsx
│   │       ├── Button.tsx
│   │       ├── SkeletonLoader.tsx
│   │       └── Snackbar.tsx
│   ├── contexts/                    # React Context providers
│   │   ├── AlertContext.tsx
│   │   ├── LoaderContext.tsx
│   │   └── SnackbarContext.tsx
│   └── navigation/                  # Navigation setup
│       ├── AppStack.tsx
│       ├── AuthStack.tsx
│       └── RootNavigator.tsx
├── screen/                          # Screen components
│   ├── appScreens/
│   └── authScreens/
├── constant /                       # App constants
│   ├── images.constant.ts
│   └── screenNames.constant.ts
├── hooks /                          # Custom React hooks
│   └── useAppNavigation.hook.ts
├── types/                           # TypeScript type definitions
│   └── navigation.type.ts
├── assets /                         # Static assets (images, icons)
│   ├── icons/
│   └── images/
├── __tests__/                       # Test files
├── android/                         # Android-specific code
├── ios/                             # iOS-specific code
├── tailwind.config.js               # TailwindCSS configuration
├── tsconfig.json                    # TypeScript configuration
├── babel.config.js                  # Babel configuration
├── metro.config.js                  # Metro bundler config
├── jest.config.js                   # Jest testing config
├── .eslintrc.js                     # ESLint configuration
└── .prettierrc.js                   # Prettier configuration
```

## Getting Started

### Prerequisites

- Node.js **20+** (see `package.json` engines requirement)
- Yarn, npm, or Bun for dependency management
- Watchman (macOS) and Java 17+ for Android development
- Xcode + CocoaPods for iOS builds (`bundle install`, `bundle exec pod install` inside `ios/`)

### Installation

```sh
# Clone repository, then install dependencies
npm install
# or
yarn install
# or
bun install
```

### Running the App

1. Start the Metro bundler:

   ```sh
   npm start
   # or
   yarn start
   # or
   bun start
   ```

2. Launch a platform build from a separate terminal:

   ```sh
   npm run android   # Android emulator or device
   npm run ios       # iOS simulator (after CocoaPods install)
   ```

   Equivalent Yarn/Bun scripts are available (`yarn android`, `bun android`, etc.).

## Available Scripts

| Script | Description |
| --- | --- |
| `start` | Start the Metro development server |
| `android` | Build and deploy the app to an Android device/emulator |
| `ios` | Build and deploy the app to the iOS simulator |
| `lint` | Run ESLint with the React Native config |
| `test` | Execute the Jest test suite |

Run scripts with the package manager of your choice (`npm run <script>`, `yarn <script>`, or `bun <script>`).

## Styling Guidelines

- Global Tailwind layers are registered in `global.css` and compiled via NativeWind. Components leverage Tailwind utility classes through the `className` prop (`App.tsx`).
- Use the `cn` helper to merge conditional class names without conflicts (`lib/utils.ts`).
- Custom color tokens and gradients are defined in `tailwind.config.js` and should be reused across components.

## UI Service Providers

- **AlertProvider** exposes `showAlert` for transient alert banners that render `AlertBox` overlays (`src/contexts/AlertContext.tsx`).
- **LoaderProvider** supplies `showLoader` / `hideLoader` and renders skeleton screens using `SkeletonLoader` during blocking operations (`src/contexts/LoaderContext.tsx`).
- **SnackbarProvider** offers convenience methods (`showError`, `showSuccess`, etc.) to surface transient messages at the bottom of the screen (`src/contexts/SnackbarContext.tsx`).

Wrap your navigation root or screen hierarchy with these providers to enable consistent UX feedback.

## Navigation

`RootNavigator` composes the authentication and application stacks and is ready to host guarded routes. Populate `AppStack` and `AuthStack` with `Stack.Screen` entries as screens are implemented (`src/navigation`).

## Testing & Quality

- Run `npm test` (or the equivalent) to execute unit tests with Jest.
- Use `npm run lint` to enforce the configured lint rules before committing changes.
- Prettier is configured via `.prettierrc.js`; format files before pushing.

## Configuration

### Environment Variables

The app uses the following configuration files:

- **`app.json`** - React Native app configuration
- **`babel.config.js`** - Babel transpilation settings
- **`metro.config.js`** - Metro bundler configuration
- **`jest.config.js`** - Testing framework setup

### Assets Management

- Place images in `assets/images/` and icons in `assets/icons/`
- Update `constant/images.constant.ts` with new image references
- Use the `declarations.d.ts` file for custom TypeScript declarations

### Constants & Types

- **Screen Names**: Define route names in `constant/screenNames.constant.ts`
- **Navigation Types**: Type definitions in `types/navigation.type.ts`
- **Custom Hooks**: Navigation utilities in `hooks/useAppNavigation.hook.ts`

## Building for Production

### Android Release Build

```sh
cd android
./gradlew assembleRelease
```

### iOS Release Build

```sh
cd ios
bundle exec fastlane beta  # or archive for App Store
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing TypeScript and ESLint rules
- Add tests for new features
- Update documentation for API changes
- Use conventional commit messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help:

- Create an issue on GitHub
- Check the [React Native documentation](https://reactnative.dev/docs/getting-started)
- Review [NativeWind documentation](https://www.nativewind.dev/) for styling questions
