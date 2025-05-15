from manim import *

class GravityScene1(Scene):
    def construct(self):
        earth = Circle(radius=1.5, color=BLUE, fill_opacity=0.7).shift(LEFT*2)
        earth_label = Text("Earth").next_to(earth, UP)
        apple = Circle(radius=0.3, color=RED, fill_opacity=0.8).shift(UP*2 + RIGHT*2)
        apple_label = Text("Apple").next_to(apple, RIGHT)

        arrow = Arrow(apple.get_center(), earth.get_center(), buff=0.2)

        self.play(Create(earth), Write(earth_label))
        self.play(Create(apple), Write(apple_label))
        self.wait(1)
        self.play(Create(arrow))
        self.wait(2)
        arrow.generate_target()
        arrow.target.set_opacity(0.5)
        self.play(MoveToTarget(arrow))
        self.wait(1)

        # Add a subtle animation to suggest continuous pull
        self.play(ApplyMethod(apple.shift, DOWN*0.5), run_time=1)