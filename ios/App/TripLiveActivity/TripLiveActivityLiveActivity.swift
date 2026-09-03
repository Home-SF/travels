//
//  TripLiveActivityLiveActivity.swift
//  TripLiveActivity
//
//  Created by Michael Lee on 8/6/26.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct TripLiveActivityAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct TripLiveActivityLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: TripLiveActivityAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension TripLiveActivityAttributes {
    fileprivate static var preview: TripLiveActivityAttributes {
        TripLiveActivityAttributes(name: "World")
    }
}

extension TripLiveActivityAttributes.ContentState {
    fileprivate static var smiley: TripLiveActivityAttributes.ContentState {
        TripLiveActivityAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: TripLiveActivityAttributes.ContentState {
         TripLiveActivityAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: TripLiveActivityAttributes.preview) {
   TripLiveActivityLiveActivity()
} contentStates: {
    TripLiveActivityAttributes.ContentState.smiley
    TripLiveActivityAttributes.ContentState.starEyes
}
