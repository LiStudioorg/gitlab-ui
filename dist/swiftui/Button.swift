import SwiftUI

// Pajamas-inspired (MIT)

public struct GlButton: View {
  public enum Category: String { case primary, secondary, tertiary }
  public enum Variant: String { case defaultCase, confirm, danger, link }
  public enum Size: String { case small, medium }

  @Binding public var loading: Bool
  public var category: Category = .primary
  public var variant: Variant = .defaultCase
  public var size: Size = .medium
  public var disabled: Bool = false
  public var block: Bool = false
  public var label: String
  public var action: (() -> Void)?

  public init(
    label: String,
    category: Category = .primary,
    variant: Variant = .defaultCase,
    size: Size = .medium,
    disabled: Bool = false,
    loading: Binding<Bool> = .constant(false),
    block: Bool = false,
    action: (() -> Void)? = nil
  ) {
    self.label = label
    self.category = category
    self.variant = variant
    self.size = size
    self.disabled = disabled
    self._loading = loading
    self.block = block
    self.action = action
  }

  public var body: some View {
    Button(action: { action?() }) {
      HStack(spacing: Gl.spacing2) {
        if loading { ProgressView().controlSize(.small) }
        Text(label)
          .font(.system(size: Gl.fontSizeSm, weight: .semibold))
      }
      .padding(.horizontal, size == .small ? Gl.spacing3 : Gl.spacing4)
      .frame(minHeight: size == .small ? 24 : 32)
      .frame(maxWidth: block ? .infinity : nil)
      .background(bgColor)
      .foregroundColor(fgColor)
      .overlay(
        RoundedRectangle(cornerRadius: Gl.radiusMd)
          .strokeBorder(borderColor, lineWidth: 1)
      )
      .cornerRadius(Gl.radiusMd)
    }
    .buttonStyle(.plain)
    .disabled(disabled || loading)
  }

  private var combo: String { pascalKey(variant.rawValue) + pascalKey(category.rawValue) }

  private func pascalKey(_ s: String) -> String {
    let map = ["defaultCase": "Default", "confirm": "Confirm", "danger": "Danger", "link": "Link",
               "primary": "Primary", "secondary": "Secondary", "tertiary": "Tertiary"]
    return map[s] ?? s
  }

  private var bgColor: Color {
    if disabled { return Gl.actionDisabledBackgroundColor }
    switch combo {
    case "DefaultPrimary": return loading ? Gl.bDefaultPrimaryBackgroundActive : Gl.bDefaultPrimaryBackgroundDefault
    case "DefaultTertiary": return Gl.bDefaultTertiaryBackgroundDefault
    case "ConfirmPrimary": return Gl.bConfirmPrimaryBackgroundDefault
    case "ConfirmSecondary": return Gl.bConfirmSecondaryBackgroundDefault
    case "ConfirmTertiary": return Gl.bConfirmTertiaryBackgroundDefault
    case "DangerPrimary": return Gl.bDangerPrimaryBackgroundDefault
    case "DangerSecondary": return Gl.bDangerSecondaryBackgroundDefault
    case "DangerTertiary": return Gl.bDangerTertiaryBackgroundDefault
    default: return Gl.bDefaultPrimaryBackgroundDefault
    }
  }

  private var fgColor: Color {
    if disabled { return Gl.actionDisabledForegroundColor }
    switch combo {
    case "DefaultPrimary": return Gl.bDefaultPrimaryForegroundDefault
    case "ConfirmPrimary": return Gl.bConfirmPrimaryForegroundDefault
    case "DangerPrimary": return Gl.bDangerPrimaryForegroundDefault
    default: return Gl.bConfirmPrimaryForegroundDefault
    }
  }

  private var borderColor: Color {
    variant == .defaultCase && category != .primary ? Gl.borderColorDefault : .clear
  }
}
