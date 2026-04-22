import { CanDeactivateFn } from '@angular/router';

// Any component that uses this guard must implement this interface
export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component
) => {
  // Ask the component if it's safe to leave
  if (component.canDeactivate && !component.canDeactivate()) {
    return confirm(
      '⚠️ You have unsaved changes. Are you sure you want to leave?'
    );
  }
  return true;
};